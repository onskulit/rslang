import styles from './AuditionGame.module.css';
import { Row, Typography, Button, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { useGetWordsForGroupQuery } from '../api/apiSlice';
import {
  INITIAL_VALUE,
  MAX_PAGE,
  NUMBER_OF_OPTIONS,
  WORDS_FOR_GAME,
} from '../../common/constants/numbers';
import shuffle from '../../common/utils/shuffle';
import { IWord, IWordWithAnswer } from '../../common/types/interfaces';
import AuditionOptions from '../../common/components/auditionOptions/AuditionOptions';
import { ArrowRightOutlined } from '@ant-design/icons';
import AudioButton from '../../common/components/audioButton/AudioButton';

const { Title } = Typography;

function AuditionGame(): JSX.Element {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [currentWords, setCurrentWords] = useState<IWord[]>([]);
  const [answer, setAnswer] = useState<IWordWithAnswer | null>(null);
  const [currentOptions, setCurrentOptions] = useState<IWord[]>([]);
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);
  const [help, setHelp] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<IWordWithAnswer[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[]>([]);

  const match = useMatch({
    path: '/audition-game/:difficulty',
  });

  const difficulty = match?.params.difficulty;

  const {
    data: words = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWordsForGroupQuery({ group: Number(difficulty), page: MAX_PAGE });

  function endCheck() {
    if (currentWords.length === INITIAL_VALUE) {
      setEnd(true);
    }
  }

  function onAnswerClick() {
    setHelp(true);
    endCheck();
  }

  function onResultClick() {
    console.log('Correct answers: ', correctAnswers);
    console.log('Wrong answers: ', wrongAnswers);
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

    if (answer?.correct === true) {
      const answerCopy = { ...answer };
      delete answerCopy.correct;
      setCorrectAnswers((prev) => [...prev, answerCopy]);
    } else if (answer) {
      setWrongAnswers((prev) => [...prev, answer]);
    }

    setAnswer(null);
    setHelp(false);
    endCheck();
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

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
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
                <AudioButton audioFile={currentWord?.audio} />
              )}
            </Row>
            <Row justify="center">
              {currentWords?.length >= 0 && !end && (
                <AuditionOptions
                  options={currentOptions}
                  correctOption={currentWord}
                  setAnswer={setAnswer}
                  help={help}
                />
              )}
            </Row>
            <Row justify="center">
              {end ? (
                <Button
                  type="primary"
                  shape="round"
                  size={'large'}
                  onClick={onResultClick}
                >
                  Результаты
                </Button>
              ) : (
                <Button
                  type="primary"
                  shape="round"
                  size={'large'}
                  onClick={answer ? onNextClick : onAnswerClick}
                >
                  {answer ? <ArrowRightOutlined /> : 'Не знаю'}
                </Button>
              )}
            </Row>
          </>
        )}
      </Space>
    </>
  );
}

export default AuditionGame;
