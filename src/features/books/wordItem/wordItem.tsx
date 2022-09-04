import React, { FC } from 'react';
import {
  IUserAggregatedWordData,
  IUserAggregatedWordsArray,
  IUserAggregatedWordsData,
} from '../../../../app/services/UserService';
import { IWord } from '../../../../common/types/interfaces';
import './WordItem.css';

interface IWordItemProps {
  activeWord: IWord | string | IUserAggregatedWordsData;
  index: number;
  word: IWord | IUserAggregatedWordData;
  words: IWord[] | undefined | IUserAggregatedWordsArray;
  toggleActiveWord: (index: number) => void;
  isStorageData: boolean;
}

const WORD_CLASSES = {
  inactive: 'word-item',
  active: 'word-item active',
};

const WordItem: FC<IWordItemProps> = ({
  index,
  activeWord,
  words,
  word,
  toggleActiveWord,
  isStorageData,
}) => {
  const toggleActiveStyle = (index: number): string => {
    if (isStorageData && words) {
      if (
        (words as IUserAggregatedWordsArray)[0].paginatedResults[index]._id ===
        (activeWord as IUserAggregatedWordData)._id
      ) {
        return WORD_CLASSES.active;
      }
      return WORD_CLASSES.inactive;
    }
    if ((words as IWord[])[index].id === (activeWord as IWord).id) {
      return WORD_CLASSES.active;
    }
    return WORD_CLASSES.inactive;
  };

  return (
    <button
      className={toggleActiveStyle(index)}
      onClick={() => toggleActiveWord(index)}
    >
      <span className={'styles.word'}>{word.word}</span>
      <span className={'styles.wordTranslate'}>{word.wordTranslate}</span>
    </button>
    // <div>sdf</div>
  );
};

export default WordItem;
