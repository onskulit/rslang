import styles from './AuditionGame.module.css';
import { Row, Typography, Radio, Button, Space, Spin } from 'antd';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useGetWordsForGroupQuery } from '../api/apiSlice';
import {
  INITIAL_VALUE,
  MAX_PAGE,
  NUMBER_OF_OPTIONS,
  WORDS_FOR_GAME,
} from '../../common/constants/numbers';
import shuffle from '../../common/utils/shuffle';
import { IWord, IWordWithAnswer } from '../../common/types/interfaces';
import AuditionOptions from './AuditionOptions';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function AuditionGame(): JSX.Element {
  const [currentWord, setCurrentWord] = useState<IWord | null>(null);
  const [currentWords, setCurrentWords] = useState<IWord[]>([]);
  const [answer, setAnswer] = useState<IWordWithAnswer | null>(null);
  const [currentOptions, setCurrentOptions] = useState<IWord[]>([]);
  const [shuffledWords, setShuffledWords] = useState<IWord[]>([]);

  const match = useMatch({
    path: '/audition-game/:difficulty',
  });

  const difficulty = match?.params.difficulty;
  const correctAnswers = [];
  const wrongAnswers = [];

  const {
    data: words = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWordsForGroupQuery({ group: Number(difficulty), page: MAX_PAGE });

  // function onAnswerClick() {}

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

    // console.log('answer is: ', answer);
    if (answer?.correct === true) {
      correctAnswers.push(answer);
    } else {
      wrongAnswers.push(answer);
    }

    // if (currentWords.length > INITIAL_VALUE) {
    //   setCurrentOptions(currentOptions);
    // } else {
    //   console.log('options reset');
    //   setCurrentOptions([]);
    // }

    setAnswer(null);
    console.log(currentWords);
  }

  useEffect(() => {
    if (isSuccess) {
      const shuffledWordsTemp = shuffle(words);

      const wordsForGame = shuffledWordsTemp.splice(
        INITIAL_VALUE,
        WORDS_FOR_GAME
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
              <p>{currentWord && currentWord?.wordTranslate}</p>
              {currentWords?.length >= 0 && (
                <AuditionOptions
                  options={currentOptions}
                  correctOption={currentWord}
                  setAnswer={setAnswer}
                ></AuditionOptions>
              )}
            </Row>
            <Row justify="center">
              {currentWords?.length >= 0 && (
                <Button
                  type="primary"
                  shape="round"
                  size={'large'}
                  onClick={onNextClick}
                >
                  {answer ? <ArrowRightOutlined /> : 'Не знаю'}
                </Button>
              )}
            </Row>
          </>
        )}
        {/* {currentWord.lendth > 0} */}
      </Space>
    </>
  );
}

export default AuditionGame;
