import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  IUserAggregatedWordData,
  IUserAggregatedWordsArray,
  IUserAggregatedWordsData,
  IUserWordResponse,
  useGetUserWordsQuery,
  useLazyGetUserWordQuery,
} from '../../../../api/userSlice';
import ErrorMessage from '../../../../../common/components/ErrorMessage';
import Loader from '../../../../../common/components/Loader';
import { IWord } from '../../../../../common/types/interfaces';
import WordItem from '../../../wordItem/wordItem';
import styles from './GroupWords.module.css';
import { useLazyGetWordQuery } from '../../../../api/apiSlice';

interface IGroupWordsProps {
  activeWord: IWord | string | IUserAggregatedWordsData;
  words: IWord[] | undefined | IUserAggregatedWordsArray;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  toggleActiveWord: (index: number) => void;
}

interface IGroupDifficultWordsData {
  groupWordsData: IGroupWordsProps;
  isStorageData: boolean;
}

type INeedWord = IWord | IUserAggregatedWordsData;

const returnNeedWord = (
  isStorageData: boolean,
  word: INeedWord
): IWord | IUserAggregatedWordData => {
  return isStorageData ? (word as IUserAggregatedWordData) : (word as IWord);
};

const GroupDifficultWords: FC<IGroupDifficultWordsData> = ({
  groupWordsData,
  isStorageData,
}) => {
  const { data, isSuccess } = useGetUserWordsQuery();
  const [getWord] = useLazyGetWordQuery();
  const [words, setWords] = useState<IWord[]>([]);

  const getWords = useMemo(
    () => async (data: IUserWordResponse[]) => {
      const difficultWords: IWord[] = [];
      const userWords = data.filter((word) => word.difficulty === 'true');
      await Promise.allSettled(
        userWords.map(async (word) => {
          const response = await getWord(word.wordId);
          if (response.data) {
            difficultWords.push(response.data);
          }
        })
      );
      return difficultWords;
    },
    []
  );

  useEffect(() => {
    if (data) {
      getWords(data).then((result) => setWords(result));
    }
  }, [data]);

  return (
    <div className={styles.wordsGroup}>
      {groupWordsData.isLoading && <Loader />}
      {groupWordsData.error && <ErrorMessage error="Непредвиденная ошибка" />}
      {words && !!words.length &&
        words.map((word, index) => {
          const currentWord = returnNeedWord(isStorageData, word);
          return (
            <WordItem
              key={
                isStorageData
                  ? (word as IUserAggregatedWordData)._id
                  : (word as IWord).id
              }
              index={index}
              activeWord={groupWordsData.activeWord}
              word={currentWord}
              words={groupWordsData.words}
              toggleActiveWord={groupWordsData.toggleActiveWord}
              isStorageData={isStorageData}
            />
          );
        })}
    </div>
  );
};

export default GroupDifficultWords;
