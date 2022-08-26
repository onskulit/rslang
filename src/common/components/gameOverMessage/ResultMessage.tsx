import React from 'react';
import { IWord } from '../../types/interfaces';
import { TitleLevel4 } from '../typography/Titles';
// import styles from './ResultMessage.module.css';

interface ResultMessageProps {
  wrongWords: IWord[];
}

enum Score {
  EXCELLENT = 2,
  GOOD = 4,
  BAD = 5,
}

enum Message {
  EXCELLENT = 'Поздравляем, отличный результат!',
  GOOD = 'Неплохо, но есть над чем поработать',
  BAD = 'В этот раз не получилось, но продолжай тренироваться!',
}

function ResultMessage({ wrongWords }: ResultMessageProps) {
  const mistakes = wrongWords.length;
  let message;

  if (mistakes <= Score.EXCELLENT) {
    message = Message.EXCELLENT;
  } else if (mistakes <= Score.GOOD) {
    message = Message.GOOD;
  } else {
    message = Message.BAD;
  }

  return <TitleLevel4>{message}</TitleLevel4>;
}

export default ResultMessage;
