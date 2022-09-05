import { NavLink } from 'react-router-dom';
import { DifficultyLevel } from '../../common/constants/numbers';
import { useState } from 'react';
import Textbook from './textbook/Textbook';
import Dictionary from './dictionary/Dictionary';
import { Radio, Space, Typography } from 'antd';
const { Title, Text } = Typography;
import styles from './Book.module.css';
import { difficultyChanged } from '../difficulty/difficultySlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import DifficultyCard from '../../common/components/difficultyCard/DifficultyCard';
import { LanguageLevels } from '../../common/types/enums';

enum BOOK {
  textbook = 'textbook',
  dictionary = 'dictionary',
}

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
    <div className={`container books ${styles.container}`}>
      <header>
        {/* <Space>
          <nav>
            <button onClick={() => setActiveBook(BOOK.textbook)}>
              Учебник
            </button>
            <button onClick={() => setActiveBook(BOOK.dictionary)}>
              Словарь
            </button>
          </nav>
          <button>
            <SettingOutlined />
          </button>
        </Space> */}
        <Title className={styles.title} level={3}>
          Уровни сложности слов:
        </Title>
      </header>
      <Radio.Group
        defaultValue={difficulty}
        size="large"
        onChange={(event) => {
          dispatch(difficultyChanged(event.target.value));
        }}
        className={styles.difficultyList}
      >
        <Radio.Button value={0}>
          <DifficultyCard difficulty={LanguageLevels.A1} />
        </Radio.Button>
        <Radio.Button value={1}>
          <DifficultyCard difficulty={LanguageLevels.A2} />
        </Radio.Button>
        <Radio.Button value={2}>
          <DifficultyCard difficulty={LanguageLevels.B1} />
        </Radio.Button>
        <Radio.Button value={3}>
          <DifficultyCard difficulty={LanguageLevels.B2} />
        </Radio.Button>
        <Radio.Button value={4}>
          <DifficultyCard difficulty={LanguageLevels.C1} />
        </Radio.Button>
        <Radio.Button value={5}>
          <DifficultyCard difficulty={LanguageLevels.C2} />
        </Radio.Button>
        <Radio.Button value={6} className={styles.hardWordsCard}>
          <Space className={'wraper'}>
            <Title className={'title'} level={3}>
              Сложные слова
            </Title>
          </Space>
        </Radio.Button>
      </Radio.Group>
      {displayActiveBook(activeBook)}
    </div>
  );
}

export default Books;
