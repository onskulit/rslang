import styles from './AuditionGame.module.css';
import { Row, Typography, Radio, Button } from 'antd';
import { useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

// interface MatchParams extends ReactDOM.Renderer {
//   match: {
//     params: {
//       difficulty: string;
//     };
//   };
// }

const { Title, Text } = Typography;

function AuditionGame(): JSX.Element {
  const match = useMatch({
    path: '/audition-game/:difficulty',
  });
  console.log(match);
  // const id = match?.url.split('/')[2];
  // console.log(id);
  // const { difficulty } = match.params;

  return (
    <div className={styles.container}>
      <Row justify="center">
        <Title
          level={3}
          style={{ fontSize: 48, marginBottom: 10, textTransform: 'uppercase' }}
        >
          Уровень сложности
        </Title>
      </Row>
      {/* <Row justify="center">
        <Text style={{ fontSize: 18 }}>
          Тренировка улучшает восприятие речи на слух.
        </Text>
      </Row>

      <Row justify="center">
        <Title level={3}>Выберите уровень сложности</Title>
      </Row> */}
    </div>
  );
}

export default AuditionGame;
