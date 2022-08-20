import { Button, Radio, Row } from 'antd';
import { useEffect, useState } from 'react';
import Sprint from '../../../features/sprint/Sprint';
import AudioCall from '../../../features/audiocall/AudioСall';
import { GamesType } from '../../types/enums';

interface GameMenuProps {
  game: GamesType;
}

function GameMenu({ game }: GameMenuProps) {
  const [difficulty, setDifficulty] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
  }, [game]);

  return (
    <>
      {!isReady && (
        <>
          <Row justify="center">Добро пожаловать в игру {game}!</Row>
          <Row justify="center">Выберите уровень сложности</Row>
          <Row justify="center">
            <Radio.Group
              defaultValue="0"
              size="large"
              onChange={(e) => setDifficulty(e.target.value)}
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
            <Button onClick={() => setIsReady(true)}>Начать</Button>
          </Row>
        </>
      )}
      {isReady && game === GamesType.sprint && <Sprint />}
      {isReady && game === GamesType.audiocall && <AudioCall />}
    </>
  );
}

export default GameMenu;
