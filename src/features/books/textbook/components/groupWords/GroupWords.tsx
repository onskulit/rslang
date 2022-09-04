import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { FC } from 'react';
import {
  IUserAggregatedWordData,
  IUserAggregatedWordsArray,
  IUserAggregatedWordsData,
} from '../../../../app/services/UserService';
import ErrorMessage from '../../../../common/components/ErrorMessage';
import Loader from '../../../../common/components/Loader';
import { IWord } from '../../../../common/types/interfaces';
import WordItem from '../wordItem/wordItem';
import styles from './GroupWords.module.css';

interface IGroupWordsProps {
  activeWord: IWord | string | IUserAggregatedWordsData;
  words: IWord[] | undefined | IUserAggregatedWordsArray;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  toggleActiveWord: (index: number) => void;
}

interface IGroupWordsData {
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

const GroupWords: FC<IGroupWordsData> = ({ groupWordsData, isStorageData }) => {
  let words = groupWordsData.words;
  if (isStorageData) {
    words = (groupWordsData.words as IUserAggregatedWordsArray)[0]
      .paginatedResults;
  }

  return (
    <div className={styles.wordsGroup}>
      {groupWordsData.isLoading && <Loader />}
      {groupWordsData.error && <ErrorMessage error="Непредвидимая ошибка" />}
      {words &&
        words.map((word: INeedWord, index: number) => {
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

export default GroupWords;
