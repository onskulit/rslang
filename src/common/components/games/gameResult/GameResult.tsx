import { Row, Space } from 'antd';
import gamesInfo from '../../../constants/gamesInfo';
import { GamesType } from '../../../types/enums';
import { IWord } from '../../../types/interfaces';
import { TitleLevel3, TitleLevel4 } from '../../typography/Titles';
import GameResultTable from './gameResultTable/GameResultTable';

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
        {!!correctWords.length && (
          <GameResultTable title="Правильные ответы:" words={correctWords} />
        )}

        {!!wrongWords.length && (
          <GameResultTable title="Неправильные ответы:" words={wrongWords} />
        )}
      </>
    </Space>
  );
}

export default GameResult;
