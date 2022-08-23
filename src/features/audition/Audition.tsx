import styles from './Audition.module.css';
import { Col, Row, Typography, Space, Radio, Button } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { difficultyChanged } from '../difficulty/difficultySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { useAddNewUserMutation, useGetUserQuery } from '../api/apiSlice';

const { Title, Paragraph, Text } = Typography;

interface DifficultyState {
  difficulty: {
    value: number;
  };
}

function Audition(): JSX.Element {
  const dispatch = useAppDispatch();
  const difficulty = useAppSelector(
    (state: DifficultyState) => state.difficulty.value
  );

  // const [addNewUser, { isLoading }] = useAddNewUserMutation();
  // const [getUser, { isLoading }] = useGetUserQuery();

  const newUser = {
    name: 'John',
    email: 'dwddd@ssas.ru',
    password: '12345689',
  };

  // id = '63033a26d48d9200162e0ce4'

  const onDifficultyChanged = (value: number) => {
    console.log(value);
    dispatch(difficultyChanged(value));
  };

  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

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
            defaultValue={String(difficulty)}
            size="large"
            onChange={(event) => onDifficultyChanged(event.target.value)}
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
            <NavLink to={`/audition-game/${difficulty}`}>Начать игру</NavLink>
          </Button>
          {/* <Button
            type="primary"
            shape="round"
            size={'large'}
            onClick={async () => {
              console.log(newUser);
              console.log(JSON.stringify(newUser));
              const userId = await addNewUser(newUser).unwrap();
              console.log(userId);
            }}
          >
            Зарегистрироваться
          </Button>
          <Button
            type="primary"
            shape="round"
            size={'large'}
            onClick={async () => {
              console.log(newUser);
              console.log(JSON.stringify(newUser));
              const userId = await addNewUser(newUser).unwrap();
              console.log(userId);
            }}
          >
            Получить пользователя
          </Button> */}
        </Row>
      </Space>
    </div>
  );
}

export default Audition;
