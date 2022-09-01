import { Radio, Row, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { difficultyChanged } from '../../../features/difficulty/difficultySlice';
import gamesInfo from '../../constants/gamesInfo';
import { difficulties, languageLevels } from '../../constants/getEnums';
import { GamesType } from '../../types/enums';
import { ButtonRounded } from '../buttons/Buttons';
import { TitleLevel3, TitleLevel4 } from '../typography/Titles';

interface GameMenuProps {
  game: GamesType;
}

function GameMenu({ game }: GameMenuProps) {
  const gameInfo = gamesInfo[game];
  const dispatch = useAppDispatch();
  const { value: difficulty } = useAppSelector(
    (state: RootState) => state.difficulty
  );

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <Row justify="center">
        <TitleLevel3>Добро пожаловать в игру {gameInfo.name}!</TitleLevel3>
      </Row>
      <Row justify="center">
        <TitleLevel4>{gameInfo.description}</TitleLevel4>
      </Row>
      <Row justify="center">Выберите уровень сложности</Row>
      <Row justify="center">
        <Radio.Group
          defaultValue={difficulty}
          size="large"
          onChange={(e) => dispatch(difficultyChanged(+e.target.value))}
        >
          {difficulties.map((difficulty) => (
            <Radio.Button value={difficulty} key={difficulty}>
              {languageLevels[difficulty]}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Row>
      <Row justify="center">
        <ButtonRounded>
          <NavLink to={gameInfo.path}>Начать игру</NavLink>
        </ButtonRounded>
      </Row>
    </Space>
  );
}

export default GameMenu;
