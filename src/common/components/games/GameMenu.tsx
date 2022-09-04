import { Radio, Row, Space, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { difficultyChanged } from '../../../features/difficulty/difficultySlice';
import gamesInfo from '../../constants/gamesInfo';
import { difficulties, languageLevels } from '../../constants/getEnums';
import { GamesType } from '../../types/enums';
import { TitleLevel2, TitleLevel4 } from '../typography/Titles';
import styles from './GameMenu.module.css';
import classNames from 'classnames';

interface GameMenuProps {
  game: GamesType;
}

function GameMenu({ game }: GameMenuProps) {
  const gameInfo = gamesInfo[game];
  const dispatch = useAppDispatch();
  const { value: difficulty } = useAppSelector(
    (state: RootState) => state.difficulty
  );
  const currentDiffuculty = difficulty;

  return (
    <div className={`container ${styles.container}`}>
      <Space
        direction="vertical"
        size="small"
        style={{ display: 'flex', maxWidth: '100%' }}
      >
        <Row justify="center">
          <TitleLevel2>Добро пожаловать в игру {gameInfo.name}!</TitleLevel2>
        </Row>
        <Row justify="center" className={styles.mb}>
          <TitleLevel4>{gameInfo.description}</TitleLevel4>
        </Row>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row justify="center">Выберите уровень сложности</Row>
          <Row justify="center">
            <Radio.Group
              defaultValue={difficulty}
              className={styles.difficultyContainer}
              size="large"
              onChange={(e) => dispatch(difficultyChanged(+e.target.value))}
            >
              {difficulties.map((difficulty) => (
                <Radio.Button
                  value={difficulty}
                  key={difficulty}
                  className={classNames(
                    styles.difficultyButton,
                    currentDiffuculty,
                    {
                      [styles[`difficultyButton${languageLevels[difficulty]}`]]:
                        currentDiffuculty === Number(difficulty),
                    }
                  )}
                >
                  {languageLevels[difficulty]}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              shape="round"
              size={'large'}
              style={{ width: 150 }}
            >
              <NavLink to={gameInfo.path}>Начать игру</NavLink>
            </Button>
          </Row>
        </Space>
      </Space>
    </div>
  );
}

export default GameMenu;
