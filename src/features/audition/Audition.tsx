import styles from './Audition.module.css';
import { Col, Row, Typography, Space, Radio, Button } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

function Audition(): JSX.Element {
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  console.log(difficultyLevel);

  return (
    <div className={styles.container}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row justify="center">
          <Title
            level={2}
            style={{
              fontSize: 48,
              textTransform: 'uppercase',
            }}
          >
            Аудиовызов
          </Title>
        </Row>
        <Row justify="center">
          <Text style={{ fontSize: 18 }}>
            Тренировка улучшает восприятие речи на слух.
          </Text>
        </Row>

        <Row justify="center">
          <Title level={3}>Выберите уровень сложности</Title>
        </Row>
        <Row justify="center" gutter={18}>
          <Radio.Group
            defaultValue="0"
            size="large"
            onChange={(event) => setDifficultyLevel(event.target.value)}
          >
            <Radio.Button value="0">0</Radio.Button>
            <Radio.Button value="1">1</Radio.Button>
            <Radio.Button value="2">2</Radio.Button>
            <Radio.Button value="3">3</Radio.Button>
            <Radio.Button value="4">4</Radio.Button>
            <Radio.Button value="5">5</Radio.Button>
          </Radio.Group>
        </Row>
        <Row justify="center">
          <Button type="primary" shape="round" size={'large'}>
            <NavLink to={`/audition-game/${difficultyLevel}`}>
              Начать игру
            </NavLink>
          </Button>
        </Row>
      </Space>
    </div>
  );
}

export default Audition;
