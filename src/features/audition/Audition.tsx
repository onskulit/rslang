import styles from './Audition.module.css';
import { Row, Space, Spin, Progress, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useGetWordsForGroupQuery } from '../api/apiSlice';
import {
  INITIAL_VALUE,
  MAX_PAGE,
  Numbers,
  PERCENT_100,
  DISABLED_TABINDEX,
} from '../../common/constants/numbers';
import shuffle from '../../common/utils/shuffle';
import {
  IWord,
  IWordWithAnswer,
  DifficultyState,
} from '../../common/types/interfaces';
import AuditionOptions from '../../common/components/auditionOptions/AuditionOptions';
import { ArrowRightOutlined } from '@ant-design/icons';
import AudioButton from '../../common/components/audioButton/AudioButton';
import { BASE_URL } from '../../common/constants/api';
import { useAppSelector } from '../../app/hooks';
import { ButtonRounded } from '../../common/components/buttons/Buttons';

import GameResult from '../../common/components/games/gameResult/GameResult';
import { GamesType, Keyboard } from '../../common/types/enums';
import GameCloser from '../../common/components/games/GameCloser';
import Loader from '../../common/components/Loader';

const NUMBER_OF_WORDS = 10;
const NUMBER_OF_OPTIONS = 5;
const PROGRESSBAR_RED = 'red';
const IMAGE_WIDTH = 300;
const BUTTON_TEXT_HELP = 'Не знаю';

function Audition(): JSX.Element {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [currentWords, setCurrentWords] = useState<IWord[]>([]);
  const [answer, setAnswer] = useState<IWordWithAnswer | null>(null);
  const [currentOptions, setCurrentOptions] = useState<IWord[]>([]);
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWordWithAnswer[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [help, setHelp] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [results, setResults] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const difficulty = useAppSelector(
    (state: DifficultyState) => state.difficulty.value
  );

  const {
    data: words = [],
    isLoading,
    isSuccess,
  } = useGetWordsForGroupQuery({ group: difficulty, page: MAX_PAGE });

  function endCheck() {
    if (currentWords.length === INITIAL_VALUE) {
      setEnd(true);
      setResults(true);
    }
  }

  function gameOverCheck() {
    if (wrongAnswers.length >= NUMBER_OF_WORDS / Numbers.TWO) {
      setGameOver(true);
      setResults(true);
      setEnd(true);
    }
  }

  function getProgressInPercent() {
    return (
      (PERCENT_100 / NUMBER_OF_WORDS) * (NUMBER_OF_WORDS - currentWords.length)
    );
  }

  function onHelpClick() {
    setHelp(true);
  }

  function onAnswerClick(answer: IWordWithAnswer) {
    setAnswer(answer);

    const answerCopy = { ...answer };
    delete answerCopy.correct;

    if (answer?.correct === true) {
      setCorrectAnswers((prev) => [...prev, answerCopy]);
    } else {
      setWrongAnswers((prev) => [...prev, answerCopy]);
    }
  }

  function onNextClick() {
    const shuffledWordsTemp = shuffledWords.slice();
    const currentWord = currentWords.shift();
    const currentOptions = shuffle([
      ...shuffledWordsTemp.splice(
        INITIAL_VALUE,
        NUMBER_OF_OPTIONS - Numbers.ONE
      ),
      currentWord,
    ]) as IWord[];

    setCurrentWords(currentWords);
    setCurrentWord(currentWord ? currentWord : null);
    setCurrentOptions(currentOptions);
    setShuffledWords(shuffledWordsTemp);
    setProgress(getProgressInPercent());
    setAnswer(null);
    setHelp(false);
    endCheck();
    gameOverCheck();
  }

  useEffect(() => {
    if (isSuccess) {
      const shuffledWordsTemp = shuffle(words);
      const wordsForGame = shuffledWordsTemp.splice(
        INITIAL_VALUE,
        NUMBER_OF_WORDS + Numbers.ONE
      ) as IWord[];
      const currentWord = wordsForGame.shift();
      if (currentWord) {
        setCurrentWord(currentWord);
      }
      setCurrentWords(wordsForGame);
      const currentOptions = shuffle([
        ...shuffledWordsTemp.splice(INITIAL_VALUE, NUMBER_OF_OPTIONS - 1),
        { ...currentWord, correct: true },
      ]) as IWord[];
      setCurrentOptions(currentOptions);
      setShuffledWords(shuffledWordsTemp);
    }
  }, [words]);

  function onEnterClick(event: KeyboardEvent) {
    if (event.key === Keyboard.ENTER) {
      if (answer) {
        onNextClick();
      } else {
        onHelpClick();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onEnterClick);
    return () => {
      document.removeEventListener('keydown', onEnterClick);
    };
  }, [answer]);

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {isLoading && <Loader />}
        {isSuccess && (
          <>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor={gameOver ? PROGRESSBAR_RED : ''}
              className={`${styles.progressBar} ${
                gameOver && styles.progressBarGameOver
              }`}
            />
            <GameCloser />
            <Row justify="center">
              {currentWord && !end && (
                <AudioButton audioFile={currentWord?.audio} mute={gameOver} />
              )}
            </Row>
            <Row justify="center">
              {!!currentWords.length && !end && (
                <AuditionOptions
                  options={currentOptions}
                  correctOption={currentWord}
                  setAnswer={onAnswerClick}
                  help={help}
                />
              )}
            </Row>
            {!results && (
              <Row justify="center">
                <ButtonRounded
                  tabIndex={DISABLED_TABINDEX}
                  onClick={answer ? onNextClick : onHelpClick}
                >
                  {answer ? <ArrowRightOutlined /> : BUTTON_TEXT_HELP}
                </ButtonRounded>
              </Row>
            )}
          </>
        )}
        {currentWord && answer && !end && (
          <>
            <Row justify="center">
              <Image
                preview={false}
                width={IMAGE_WIDTH}
                src={`${BASE_URL}/${currentWord.image}`}
              />
            </Row>
          </>
        )}
        {results && (
          <GameResult
            game={GamesType.audition}
            correctWords={correctAnswers}
            wrongWords={wrongAnswers}
          />
        )}
      </Space>
    </>
  );
}

export default Audition;
