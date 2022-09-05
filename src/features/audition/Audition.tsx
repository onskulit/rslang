import styles from './Audition.module.css';
import { Row, Space, Progress, Image } from 'antd';
import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ButtonRounded } from '../../common/components/buttons/Buttons';

import GameResult from '../../common/components/games/gameResult/GameResult';
import { GamesType, Keyboard } from '../../common/types/enums';
import GameCloser from '../../common/components/games/GameCloser';
import Loader from '../../common/components/Loader';
import { updateGameStatus } from '../gameStatus/gameStatusSlice';
import { useNavigate, useNavigationType } from 'react-router-dom';

const NUMBER_OF_WORDS = 10;
const NUMBER_OF_OPTIONS = 5;
const PROGRESSBAR_BG = '#5855f2';
const PROGRESSBAR_RED = '#fc3f1d';
const IMAGE_WIDTH = 300;
const BUTTON_TEXT_HELP = 'Не знаю';

function Audition(): JSX.Element {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [currentWords, setCurrentWords] = useState<IWord[]>([]);
  const [answer, setAnswer] = useState<IWordWithAnswer | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [currentOptions, setCurrentOptions] = useState<IWord[]>([]);
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<IWordWithAnswer[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [help, setHelp] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [results, setResults] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const navigate = useNavigate();
  const navigateType = useNavigationType();

  const dispatch = useAppDispatch();
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
    setStreak(0);
  }

  function onAnswerClick(answer: IWordWithAnswer) {
    setAnswer(answer);

    const answerCopy = { ...answer };
    delete answerCopy.correct;

    if (answer?.correct === true) {
      setCorrectAnswers((prev) => [...prev, answerCopy]);
      setStreak((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [...prev, answerCopy]);
      setStreak(0);
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
      dispatch(updateGameStatus(true));
    }
  }, [words]);

  function onEnterClick(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === Keyboard.ENTER) {
      if (answer) {
        onNextClick();
      } else {
        onHelpClick();
      }
    }
  }

  function onKeyDownHandler(event: React.KeyboardEvent) {
    event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('keydown', onEnterClick);
    return () => {
      document.removeEventListener('keydown', onEnterClick);
    };
  }, [answer]);

  useEffect(() => {
    if (streak > maxStreak) setMaxStreak(streak);
  }, [streak]);

  useEffect(() => {
    if (navigateType === 'POP') {
      navigate('../audition', { replace: true });
    }
  }, []);

  return (
    <div className={styles.audition}>
      {isSuccess && (
        <Progress
          percent={progress}
          showInfo={false}
          strokeColor={gameOver ? PROGRESSBAR_RED : PROGRESSBAR_BG}
          className={`${styles.progressBar} ${
            gameOver && styles.progressBarGameOver
          }`}
        />
      )}
      <div className={styles.auditionMain}>
        <div className={`container ${styles.container}`}>
          {isLoading && (
            <div className={styles.paddingTop}>
              <Loader />
            </div>
          )}

          {!results && (
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex', width: '100%' }}
              className={styles.paddingTop}
            >
              {isSuccess && (
                <>
                  <GameCloser />
                  <Row justify="center">
                    {currentWord && !end && (
                      <AudioButton
                        audioFile={currentWord?.audio}
                        mute={gameOver}
                      />
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
                  <Row justify="center">
                    <ButtonRounded
                      tabIndex={DISABLED_TABINDEX}
                      onClick={answer ? onNextClick : onHelpClick}
                      onKeyDown={(event) => {
                        onKeyDownHandler(event);
                      }}
                    >
                      {answer ? <ArrowRightOutlined /> : BUTTON_TEXT_HELP}
                    </ButtonRounded>
                  </Row>
                </>
              )}
              {currentWord && answer && !end && (
                <>
                  <Row justify="center">
                    <Image
                      preview={false}
                      width={IMAGE_WIDTH}
                      className={styles.image}
                      rootClassName={styles.imageContainer}
                      src={`${BASE_URL}/${currentWord.image}`}
                    />
                  </Row>
                </>
              )}
            </Space>
          )}
          {results && (
            <GameResult
              game={GamesType.audition}
              correctWords={correctAnswers}
              wrongWords={wrongAnswers}
              maxStreak={maxStreak}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Audition;
