import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { FC } from 'react';
import { IWord } from '../../../../../common/types/interfaces';
import WordItem from '../../../wordItem/wordItem';
import styles from './GroupWords.module.css';

interface IGroupWordsProps {
  activeWord: IWord | string;
  words: IWord[] | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  toggleActiveWord: (index: number) => void;
}

interface IGroupWordsData {
  data: IGroupWordsProps;
}

const GroupWords: FC<IGroupWordsData> = ({ data }) => {
  return (
    <div className={styles.wordsGroup}>
      {data.isLoading && <h1>Loading...</h1>}
      {data.error && <h1>ERROR!!!</h1>}
      {data.words &&
        data.words.map((word: IWord, index: number) => (
          <WordItem
            key={word.id}
            index={index}
            activeWord={data.activeWord}
            word={word}
            words={data.words}
            toggleActiveWord={data.toggleActiveWord}
          />
        ))}
    </div>
  );
};

export default GroupWords;
