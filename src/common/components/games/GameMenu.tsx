import { Radio, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { difficultyChanged } from '../../../features/difficulty/difficultySlice';
import { GamesType } from '../../types/enums';
import { ButtonRounded } from '../buttons/Buttons';
import { TitleLevel3 } from '../typography/Titles';

interface GameMenuProps {
  game: GamesType;
  children: React.ReactNode;
}

function GameMenu({ game, children }: GameMenuProps) {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, [game]);

  return (
    <>
      {!isReady ? (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Row justify="center">
            <TitleLevel3>Добро пожаловать в игру {game}!</TitleLevel3>
          </Row>
          <Row justify="center">Выберите уровень сложности</Row>
          <Row justify="center">
            <Radio.Group
              defaultValue="0"
              size="large"
              onChange={(e) => dispatch(difficultyChanged(+e.target.value))}
            >
              <Radio.Button value="0">1</Radio.Button>
              <Radio.Button value="1">2</Radio.Button>
              <Radio.Button value="2">3</Radio.Button>
              <Radio.Button value="3">4</Radio.Button>
              <Radio.Button value="4">5</Radio.Button>
              <Radio.Button value="5">6</Radio.Button>
            </Radio.Group>
          </Row>
          <Row justify="center">
            <ButtonRounded onClick={() => setIsReady(true)}>
              Начать
            </ButtonRounded>
          </Row>
        </Space>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default GameMenu;
