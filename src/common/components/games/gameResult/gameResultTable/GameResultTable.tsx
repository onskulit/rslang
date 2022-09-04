import { Divider, List } from 'antd';
import React from 'react';
import { IWord } from '../../../../types/interfaces';
import styles from './GameResultTable.module.css';

interface GameResultTableProps {
  title: string;
  words: IWord[];
  style?: React.CSSProperties;
}

function GameResultTable({ title, words, style = {} }: GameResultTableProps) {
  return (
    <>
      <Divider orientation="center" className={styles.divider}>
        {title}
      </Divider>
      <List
        bordered
        size="small"
        dataSource={words}
        className={styles.list}
        renderItem={(word) => (
          <List.Item style={{ justifyContent: 'center' }}>
            {`${word.word} - ${word.wordTranslate}`}
          </List.Item>
        )}
        style={{ ...style }}
      />
    </>
  );
}

export default GameResultTable;
