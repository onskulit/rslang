import { Row } from 'antd';
import { GamesType } from '../../types/enums';

interface GameResultProps {
  result: number;
  game: GamesType;
}

function GameResult({ result, game }: GameResultProps) {
  return (
    <>
      <Row justify="center">Игра окончена!</Row>
      <Row justify="center">
        Ваш результат в игре {game}: {result}
      </Row>
    </>
  );
}

export default GameResult;
