import React from 'react';
import { IWord } from '../../types/interfaces';
import { TitleLevel4 } from '../typography/Titles';
// import styles from './ResultMessage.module.css';

interface ResultMessageProps {
  wrongWords: IWord[];
}

function ResultMessage({ wrongWords }: ResultMessageProps) {
  const mistakes = wrongWords.length;
  let message;

  if (mistakes <= 2) {
    message = 'Поздравляем, отличный результат!';
  } else if (mistakes <= 4) {
    message = 'Неплохо, но есть над чем поработать';
  } else {
    message = 'В этот раз не получилось, но продолжай тренироваться!';
  }

  return <TitleLevel4>{message}</TitleLevel4>;
}

export default ResultMessage;
