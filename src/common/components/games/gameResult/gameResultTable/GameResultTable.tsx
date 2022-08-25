import { Divider, List } from 'antd';
import { IWord } from '../../../../types/interfaces';

interface GameResultTableProps {
  title: string;
  words: IWord[];
}

function GameResultTable({ title, words }: GameResultTableProps) {
  return (
    <>
      <Divider orientation="left">{title}</Divider>
      <List
        bordered
        dataSource={words}
        renderItem={(word) => (
          <List.Item>{`${word.word} - ${word.wordTranslate}`}</List.Item>
        )}
      />
    </>
  );
}

export default GameResultTable;
