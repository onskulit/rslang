import { Divider, Row, Space } from 'antd';
import gamesInfo from '../../../constants/gamesInfo';
import { GamesType } from '../../../types/enums';
import { IWord } from '../../../types/interfaces';
import ResultMessage from '../../gameOverMessage/ResultMessage';
import { TitleLevel3, TitleLevel4 } from '../../typography/Titles';
import GameResultTable from './gameResultTable/GameResultTable';

interface GameResultProps {
  result?: number;
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
    <Space
      direction="vertical"
      size="small"
      style={{ display: 'flex', marginBottom: 40 }}
    >
      <Row justify="center">
        <TitleLevel3>Игра окончена!</TitleLevel3>
      </Row>
      <Row justify="center">
        {result && (
          <TitleLevel4>
            Ваш результат в игре {gameInfo.name}: {result}
          </TitleLevel4>
        )}
        {!result && <ResultMessage wrongWords={wrongWords} />}
      </Row>
      <>
        {!!correctWords.length && (
          <GameResultTable
            title="Правильные ответы:"
            words={correctWords}
            style={{ borderColor: 'green' }}
          />
        )}

        {!!wrongWords.length && (
          <GameResultTable
            title="Неправильные ответы:"
            words={wrongWords}
            style={{ borderColor: 'red' }}
          />
        )}
      </>
    </Space>
  );
}

export default GameResult;
