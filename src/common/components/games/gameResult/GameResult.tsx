import { Row, Space } from 'antd';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { updateGameStatus } from '../../../../features/gameStatus/gameStatusSlice';
import gamesInfo from '../../../constants/gamesInfo';
import { GamesType } from '../../../types/enums';
import { IWord } from '../../../types/interfaces';
import { ButtonRounded } from '../../buttons/Buttons';
import ResultMessage from '../../gameOverMessage/ResultMessage';
import { TitleLevel3, TitleLevel4 } from '../../typography/Titles';
import GameResultTable from './gameResultTable/GameResultTable';

interface GameResultProps {
  result?: number;
  game: GamesType;
  correctWords: IWord[];
  wrongWords: IWord[];
  maxStreak: number;
}

function GameResult({
  result,
  game,
  correctWords,
  wrongWords,
  maxStreak,
}: GameResultProps) {
  const gameInfo = gamesInfo[game];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateGameStatus(false));
  }, []);
  return (
    <Space
      direction="vertical"
      size="middle"
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
      <Row justify="center">
        <Space>
          <NavLink to={gameInfo.pathWithMenu}>
            <ButtonRounded style={{ width: 200 }}>Сыграть снова</ButtonRounded>
          </NavLink>
          <NavLink to="/">
            <ButtonRounded style={{ width: 200 }}>На Главную</ButtonRounded>
          </NavLink>
        </Space>
      </Row>
    </Space>
  );
}

export default GameResult;
