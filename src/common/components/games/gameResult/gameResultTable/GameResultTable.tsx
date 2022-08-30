import { Divider, List } from 'antd';
import React from 'react';
import { IWord } from '../../../../types/interfaces';

interface GameResultTableProps {
  title: string;
  words: IWord[];
  style?: React.CSSProperties;
}

function GameResultTable({ title, words, style = {} }: GameResultTableProps) {
  return (
    <>
      <Divider orientation="center">{title}</Divider>
      <List
        bordered
        size="small"
        dataSource={words}
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
