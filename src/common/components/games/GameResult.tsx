import { Divider, List, Row, Space } from 'antd';
import gamesInfo from '../../constants/gamesInfo';
import { GamesType } from '../../types/enums';
import { IWord } from '../../types/interfaces';
import { TitleLevel3, TitleLevel4 } from '../typography/Titles';

interface GameResultProps {
  result: number;
  game: GamesType;
  correctWords: IWord[];
  wrongWords: IWord[];
}

function GameResult({
  result,
  game,
  correctWords,
  wrongWords,
}: GameResultProps) {
  const gameInfo = gamesInfo[game];
  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <Row justify="center">
        <TitleLevel3>Игра окончена!</TitleLevel3>
      </Row>
      <Row justify="center">
        <TitleLevel4>
          Ваш результат в игре {gameInfo.name}: {result}
        </TitleLevel4>
      </Row>
      <>
        {correctWords.length > 0 && (
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
          </>
        )}

        {wrongWords.length > 0 && (
          <>
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
        )}
      </>
    </Space>
  );
}

export default GameResult;
