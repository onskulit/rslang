import React from 'react';
import { Divider, List } from 'antd';

import styles from './AudioResults.module.css';
import { IWord } from '../../types/interfaces';

interface IAudioResultsProps {
  correctWords: IWord[];
  wrongWords: IWord[];
}

function AudioResults({ correctWords, wrongWords }: IAudioResultsProps) {
  return (
    <>
      <Divider orientation="left">Правильные ответы:</Divider>
      <List
        bordered
        dataSource={correctWords}
        renderItem={(word) => (
          <List.Item>
            {word.word} - {word.wordTranslate}
          </List.Item>
        )}
      />
      <Divider orientation="left">Неправильные ответы:</Divider>
      <List
        bordered
        dataSource={wrongWords}
        renderItem={(word) => (
          <List.Item>
            {word.word} - {word.wordTranslate}
          </List.Item>
        )}
      />
    </>
  );
}

export default AudioResults;
