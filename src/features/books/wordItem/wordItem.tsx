import React, { FC } from 'react';
import { IWord } from '../../../common/types/interfaces';
import './WordItem.css';

interface IWordItemProps {
  activeWord: string | IWord;
  index: number;
  word: IWord;
  words: IWord[] | undefined;
  toggleActiveWord: (index: number) => void;
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
}) => {
  const toggleActiveStyle = (index: number): string => {
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
  );
};

export default WordItem;
