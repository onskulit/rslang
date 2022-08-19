import styles from './Audition.module.css';
import { Col, Row, Typography, Space, Radio } from 'antd';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;

function Audition(): JSX.Element {
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  console.log(difficultyLevel);

  return (
    <div className={styles.container}>
      <Row justify="center">
        <Title
          level={2}
          style={{ fontSize: 48, marginBottom: 10, textTransform: 'uppercase' }}
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
      <Row justify="center">
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
    </div>
  );
}

export default Audition;
