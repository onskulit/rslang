import { GamesType } from '../../types/enums';

interface GameResultProps {
  result: number;
  game: GamesType;
}

function GameResult({ result, game }: GameResultProps) {
  return (
    <>
      <div>Игра окончена!</div>
      <div>
        Ваш результат в игре {game}: {result}
      </div>
    </>
  );
}

export default GameResult;
