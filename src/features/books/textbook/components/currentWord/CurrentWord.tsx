import React, { FC, useEffect, useMemo, useState } from 'react';
import { Space } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import styles from './CurrentWord.module.css';
import { IWord } from '../../../../../common/types/interfaces';
import { BASE_URL } from '../../../../../common/constants/api';
import {
  TitleLevel2,
  TitleLevel3,
} from '../../../../../common/components/typography/Titles';
import { useAppSelector } from '../../../../../app/hooks';
import {
  IUserAggregatedWordData,
  // IUserAggregatedWordsData,
  IUserWordResponse,
  // useGetAggregatedWordsQuery,
  useGetUserWordQuery,
  useLazyGetUserWordQuery,
  usePostUserWordMutation,
  usePutUserWordMutation,
} from '../../../../api/userSlice';
import { IPostPutWord } from '../../../../authorization/common';
import Title from 'antd/lib/typography/Title';

type NeedWord = IWord | IUserAggregatedWordData | string;
type NeedKnownWord = IWord | IUserAggregatedWordData;

interface ICurrentWord {
  word: NeedWord;
  isStorageData: boolean;
}

interface IProps {
  wordProps: IUserWordResponse | undefined;
  isWord: boolean;
  postWord: IPostPutWord;
  putWord: IPostPutWord;
  id: string;
}

const playAudio = (audioPath: string): void => {
  const audio = new Audio(`${BASE_URL}/${audioPath}`);
  audio.play();
};

const wordPutLearnProcess = (word: IUserWordResponse, put: IPostPutWord) => {
  const { optional, wordId } = word;
  if (word.optional.isLearned) {
    put({
      wordId,
      body: {
        difficulty: 'true',
        optional: {
          ...optional,
          isLearned: false,
        },
      },
    });
    return;
  }
  put({
    wordId,
    body: {
      difficulty: 'false',
      optional: {
        ...optional,
        isLearned: true,
      },
    },
  });
};

const wordPutDifficulteProcess = (
  word: IUserWordResponse,
  put: IPostPutWord
) => {
  const { optional, wordId } = word;
  word;

  if (word.difficulty === 'true') {
    put({
      wordId,
      body: {
        difficulty: 'false',
        optional: {
          ...optional,
          isLearned: true,
        },
      },
    });
    return;
  }

  put({
    wordId,
    body: {
      difficulty: 'true',
      optional: {
        ...optional,
        isLearned: false,
      },
    },
  });
};

const addToLearned = (props: IProps) => {
  if (props.isWord) {
    const word = props.wordProps as IUserWordResponse;
    wordPutLearnProcess(word, props.putWord);
    return;
  }

  props.postWord({
    wordId: props.id,
    body: {
      difficulty: 'false',
      optional: {
        learningProgress: 0,
        percentCorrectAnswers: 0,
        isNew: false,
        isLearned: true,
      },
    },
  });
};

const addToDifficulte = (props: IProps) => {
  if (props.isWord) {
    const word = props.wordProps as IUserWordResponse;
    wordPutDifficulteProcess(word, props.putWord);
    return;
  }

  props.postWord({
    wordId: props.id,
    body: {
      difficulty: 'true',
      optional: {
        learningProgress: 0,
        percentCorrectAnswers: 0,
        isNew: false,
        isLearned: false,
      },
    },
  });
};

const returnId = (
  isStorageData: boolean,
  word: IWord | IUserAggregatedWordData | string
): string => {
  return isStorageData
    ? (word as IUserAggregatedWordData)._id
    : (word as IWord).id;
};

const initialLearnedButtonText = '+ в изученое слово';
const isLearnedButtonText = 'Слово изучено';
const initialDifficultButtonText = '+ в сложное слово';
const isDifficultButtonText = 'Сложное слово';

const CurrentWord: FC<ICurrentWord> = ({ word, isStorageData }) => {
  const [learnedButtonText, setLearnedButtonText] = useState(
    initialLearnedButtonText
  );
  const [difficultyButtonText, setDifficultyButtonText] = useState(
    initialDifficultButtonText
  );

  const validation = useAppSelector((state) => state.user.validate);
  const { data: wordProps, isSuccess: isWord } = useGetUserWordQuery(
    returnId(isStorageData, word)
  );
  const [getWord] = useLazyGetUserWordQuery();

  const [postWord, { isSuccess: isPostSuccess, data: postData }] =
    usePostUserWordMutation();
  const [putWord, { isSuccess: isPutSuccess, data: putData }] =
    usePutUserWordMutation();

  const props = {
    wordProps,
    isWord,
    postWord,
    putWord,
    id: isStorageData
      ? (word as IUserAggregatedWordData)._id
      : (word as IWord).id,
  };

  const getNewWordInfo = useMemo(
    () => async () => {
      const response = await getWord(returnId(isStorageData, word));
      if (response.data) {
        setDifficultyButtonText(initialDifficultButtonText);
        setLearnedButtonText(initialLearnedButtonText);
        if (response.data.difficulty === 'true') {
          setDifficultyButtonText(isDifficultButtonText);
        }
        if (response.data.optional.isLearned === true) {
          setLearnedButtonText(isLearnedButtonText);
        }
      }
    },
    []
  );

  useEffect(() => {
    if (isPostSuccess || isPutSuccess) {
      getNewWordInfo();
    }
  }, [isPostSuccess, isPutSuccess]);

  useEffect(() => {
    setDifficultyButtonText(initialDifficultButtonText);
    setLearnedButtonText(initialLearnedButtonText);
    if (wordProps) {
      if (wordProps.difficulty === 'true') {
        setDifficultyButtonText(isDifficultButtonText);
      }
      if (wordProps.optional.isLearned === true) {
        setLearnedButtonText(isLearnedButtonText);
      }
    }
  }, [word, wordProps]);

  return (
    <div className={styles.currentWord}>
      <div className={styles.image}>
        <img
          src={`${BASE_URL}/${(word as NeedKnownWord)?.image}`}
          alt="word image"
        />
      </div>
      <div className={styles.information}>
        <div className={styles.soundBox}>
          <Title level={2} className={styles.title}>
            {(word as NeedKnownWord)?.word}
          </Title>
          <button
            className={styles.soundButton}
            onClick={() => playAudio((word as NeedKnownWord)?.audio as string)}
          >
            <SoundOutlined />
          </button>
        </div>
        <Space className={styles.transcriptionBox}>
          <Title level={3} className={styles.title}>
            {(word as NeedKnownWord)?.wordTranslate}
          </Title>
          <p className={styles.transcription}>
            {(word as NeedKnownWord)?.transcription}
          </p>
        </Space>
        {validation ? (
          <Space className="buttons">
            {/*             <button
              onClick={() => {
                addToLearned(props);
              }}
            >
              {learnedButtonText}
            </button>
            <button
              onClick={() => {
                addToDifficulte(props);
              }}
            >
              {difficultyButtonText}
            </button> */}
          </Space>
        ) : (
          ''
        )}
        <div className={'description'}>
          <Space direction="vertical">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Title level={3} className={styles.title}>
                Значение
              </Title>
              <button
                className={styles.soundButton}
                onClick={() =>
                  playAudio((word as NeedKnownWord)?.audioMeaning as string)
                }
              >
                <SoundOutlined />
              </button>
            </div>
            <p
              className={'paragraph'}
              dangerouslySetInnerHTML={{
                __html: (word as NeedKnownWord)?.textMeaning as string,
              }}
            />
            <p className={'paragraph'}>
              {(word as NeedKnownWord)?.textMeaningTranslate}
            </p>
          </Space>
          <Space direction="vertical">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Title level={3} className={styles.title}>
                Пример
              </Title>
              <button
                className={styles.soundButton}
                onClick={() =>
                  playAudio((word as NeedKnownWord)?.audioExample as string)
                }
              >
                <SoundOutlined />
              </button>
            </div>
            <p
              className={'paragraph'}
              dangerouslySetInnerHTML={{
                __html: (word as NeedKnownWord)?.textExample as string,
              }}
            />
            <p className={'paragraph'}>
              {(word as NeedKnownWord)?.textExampleTranslate}
            </p>
          </Space>
        </div>
        <Title level={3} className={styles.title}>
          Прогресс изучения:
          {` ${wordProps?.optional.learningProgress}`}
        </Title>
        {/* <div className="statistic">
          <TitleLevel3>Ответы в играх:</TitleLevel3>
          <div className={styles.gamesBox}>
            <div className={styles.gameBox}>
              <span className={styles.game}>Аудиовызов</span>
              <span>0</span>
            </div>
            <div className={styles.gameBox}>
              <span className={styles.game}>Спринт</span>
              <span>0</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CurrentWord;
