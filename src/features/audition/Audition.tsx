import styles from './Audition.module.css';
import { Row, Space, Spin, Progress, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useGetWordsForGroupQuery } from '../api/apiSlice';
import {
  INITIAL_VALUE,
  MAX_PAGE,
  NUMBER_OF_OPTIONS,
  WORDS_FOR_GAME,
  PERCENT_100,
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
import { GamesType } from '../../common/types/enums';

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
  } = useGetWordsForGroupQuery({ group: Number(difficulty), page: MAX_PAGE });

  function endCheck() {
    if (currentWords.length === INITIAL_VALUE) {
      setEnd(true);
      setResults(true);
    }
  }

  function gameOverCheck() {
    if (wrongAnswers.length >= WORDS_FOR_GAME / 2) {
      setGameOver(true);
      setResults(true);
      setEnd(true);
    }
  }

  function getProgressInPercent() {
    return (
      (PERCENT_100 / WORDS_FOR_GAME) * (WORDS_FOR_GAME - currentWords.length)
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
      ...shuffledWordsTemp.splice(INITIAL_VALUE, NUMBER_OF_OPTIONS - 1),
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
        WORDS_FOR_GAME + 1
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

  function onEnterClick(e: KeyboardEvent) {
    if (e.key === 'Enter') {
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
        <Progress
          percent={progress}
          showInfo={false}
          strokeColor={gameOver ? 'red' : ''}
          className={`${styles.progressBar} ${
            gameOver && styles.progressBarGameOver
          }`}
        />
        {isLoading && (
          <Row justify="center">
            <Spin />
          </Row>
        )}
        {isSuccess && (
          <>
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
                  tabIndex={-1}
                  onClick={answer ? onNextClick : onHelpClick}
                >
                  {answer ? <ArrowRightOutlined /> : 'Не знаю'}
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
                width={300}
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
