import React, { FC } from 'react';
import { Typography } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import styles from './CurrentWord.module.css';
import { IWord } from '../../../../../common/types/interfaces';
const { Title } = Typography;

interface ICurrentWord {
  word: IWord | undefined;
}

const CurrentWord: FC<ICurrentWord> = ({ word }) => {
  return (
    <div className={styles.currentWord}>
      <div className={styles.image}>
        <img
          src={`https://rs-lang-react.herokuapp.com/${word?.image}`}
          alt="word image"
        />
      </div>
      <div className={styles.information}>
        <div className={styles.soundBox}>
          <Title style={{ margin: 0 }} level={2}>
            {word?.word}
          </Title>
          <button className={styles.soundButton}>
            <SoundOutlined />
          </button>
        </div>
        <div className={styles.transcriptionBox}>
          <Title style={{ margin: 0 }} level={3}>
            {word?.wordTranslate}
          </Title>
          <p className={styles.transcription}>{word?.transcription}</p>
        </div>
        <div className="buttons">
          <button>+ в изученое слово</button>
          <button>+ в сложное слово</button>
        </div>
        <div className={'description'}>
          <div>
            <Title level={3}>Значение</Title>
            <p
              className={'paragraph'}
              dangerouslySetInnerHTML={{
                __html: word?.textMeaning as string,
              }}
            />
            <p className={'paragraph'}>{word?.textMeaningTranslate}</p>
          </div>
          <div>
            <Title level={3}>Пример </Title>
            <p
              className={'paragraph'}
              dangerouslySetInnerHTML={{
                __html: word?.textExample as string,
              }}
            />
            <p className={'paragraph'}>{word?.textExampleTranslate}</p>
          </div>
        </div>
        <div className="statistic">
          <Title style={{ marginBottom: '5px' }} level={3}>
            Ответы в играх:
          </Title>
          <div className={styles.gamesBox}>
            <div className={styles.gameBox}>
              <span className={styles.game}>Аудиовызов</span>
              <span>0</span>
            </div>
            <div className={styles.gameBox}>
              <span className={styles.game}>Спринт</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWord;
