import { NavLink } from 'react-router-dom';
import { DifficultyLevel } from '../../common/constants/numbers';
import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Textbook from './textbook/Textbook';
import Dictionary from './dictionary/Dictionary';
import { Radio, Space, Typography } from 'antd';
const { Title, Text } = Typography;
import './Book.css';
import { difficultyChanged } from '../difficulty/difficultySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Books() {
  const { value: difficulty } = useAppSelector((state) => state.difficulty);
  const dispatch = useAppDispatch();
  const [activeBook, setActiveBook] = useState('Textbook');

  const displayActiveBook = (book: string): JSX.Element => {
    return book === 'Textbook' ? (
      <Textbook activeGroup={difficulty} />
    ) : (
      <Dictionary />
    );
  };

  return (
    <div>
      <header>
        <Space>
          <nav>
            <button onClick={() => setActiveBook('Textbook')}>Учебник</button>
            <button onClick={() => setActiveBook('Dictionary')}>Словарь</button>
          </nav>
          <button>
            <SettingOutlined />
          </button>
        </Space>
        <p>Уровни сложности слов</p>
      </header>
      <Radio.Group
        defaultValue={DifficultyLevel.LEVEL_0}
        size="large"
        onChange={(event) => {
          dispatch(difficultyChanged(event.target.value));
        }}
        className={'levels'}
      >
        <Radio.Button value={0} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Easy
            </Title>
            <Text className={'word-amount'}>1-600</Text>
          </Space>
          <Space className="level">
            <Title level={3}>A1</Title>
          </Space>
        </Radio.Button>
        <Radio.Button value={1} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Easy
            </Title>
            <Text className={'word-amount'}>601-1200</Text>
          </Space>
          <Space className="level">
            <Title level={3}>A2</Title>
          </Space>
        </Radio.Button>
        <Radio.Button value={2} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Medium
            </Title>
            <Text className={'word-amount'}>1201-1800</Text>
          </Space>
          <Space className="level">
            <Title level={3}>B1</Title>
          </Space>
        </Radio.Button>
        <Radio.Button value={3} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Medium
            </Title>
            <Text className={'word-amount'}>1801-2400</Text>
          </Space>
          <Space className="level">
            <Title level={3}>A1</Title>
          </Space>
        </Radio.Button>
        <Radio.Button value={4} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Hard
            </Title>
            <Text className={'word-amount'}>2401-3000</Text>
          </Space>
          <Space className="level">
            <Title level={3}>C1</Title>
          </Space>
        </Radio.Button>
        <Radio.Button value={5} className={'button'}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Hard
            </Title>
            <Text className={'word-amount'}>3001-3600</Text>
          </Space>
          <Space className="level">
            <Title level={3}>C1</Title>
          </Space>
        </Radio.Button>
      </Radio.Group>
      {displayActiveBook(activeBook)}
    </div>
  );
}

export default Books;
