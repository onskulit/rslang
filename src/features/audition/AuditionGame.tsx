import styles from './AuditionGame.module.css';
import { Row, Typography, Button, Space, Spin, Progress, Image } from 'antd';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useGetWordsForGroupQuery } from '../api/apiSlice';
import {
  INITIAL_VALUE,
  MAX_PAGE,
  NUMBER_OF_OPTIONS,
  WORDS_FOR_GAME,
  PERCENT_100,
} from '../../common/constants/numbers';
import shuffle from '../../common/utils/shuffle';
import { IWord, IWordWithAnswer } from '../../common/types/interfaces';
import AuditionOptions from '../../common/components/auditionOptions/AuditionOptions';
import { ArrowRightOutlined } from '@ant-design/icons';
import AudioButton from '../../common/components/audioButton/AudioButton';
import AuditionResults from '../../common/components/auditionResults/AuditionResults';
import GameOverMessage from '../../common/components/gameOverMessage/GameOverMessage';
import { BASE_URL } from '../../common/constants/api';

const { Title } = Typography;

function AuditionGame(): JSX.Element {
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

  const match = useMatch({
    path: '/audition-game/:difficulty',
  });

  const difficulty = match?.params.difficulty;

  const {
    data: words = [],
    isLoading,
    isSuccess,
  } = useGetWordsForGroupQuery({ group: Number(difficulty), page: MAX_PAGE });

  function endCheck() {
    if (currentWords.length === INITIAL_VALUE) {
      setEnd(true);
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

  function onResultClick() {
    setResults(true);
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
  }, [end, answer]);

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

        <Row justify="center">
          <Title
            level={3}
            style={{
              fontSize: 32,
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            Уровень сложности {difficulty}
          </Title>
        </Row>
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
              {!!currentWords?.length && !end && (
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
                {end ? (
                  <Button
                    type="primary"
                    shape="round"
                    size={'large'}
                    tabIndex={-1}
                    onClick={onResultClick}
                  >
                    Результаты
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    size={'large'}
                    tabIndex={-1}
                    onClick={answer ? onNextClick : onHelpClick}
                  >
                    {answer ? <ArrowRightOutlined /> : 'Не знаю'}
                  </Button>
                )}
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
        {gameOver && <GameOverMessage />}
        {results && (
          <AuditionResults
            correctWords={correctAnswers}
            wrongWords={wrongAnswers}
          />
        )}
      </Space>
    </>
  );
}

export default AuditionGame;
