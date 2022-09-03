import React, { FC, MouseEventHandler, useEffect } from 'react';
import { Space } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import styles from './CurrentWord.module.css';
import { IWord } from '../../../../common/types/interfaces';
import { BASE_URL } from '../../../../common/constants/api';
import {
  TitleLevel2,
  TitleLevel3,
} from '../../../../common/components/typography/Titles';
import { useAppSelector } from '../../../../app/hooks';
import {
  IUserWord,
  useGetUserWordQuery,
  usePostUserWordMutation,
  usePutUserWordMutation,
} from '../../../../app/services/UserService';
import { useDispatch } from 'react-redux';

interface ICurrentWord {
  word: IWord | undefined;
}

const playAudio = (audioPath: string): void => {
  const audio = new Audio(`${BASE_URL}/${audioPath}`);
  audio.play();
};

// export interface IUserWord {
// difficulty: boolean;
// optional: {
//   learningProgress: number;
//   percentCorrectAnswers: number;
//   isNew: boolean;
//   isLearned: boolean;
// };
// }

const CurrentWord: FC<ICurrentWord> = ({ word }) => {
  const validation = useAppSelector((state) => state.user.validate);
  const { data: dd, isSuccess: isWord } = useGetUserWordQuery(
    word?.id as string
  );
  const [postWord, { isSuccess: isPostSuccess, data: postData }] =
    usePostUserWordMutation();
  const [putWord, { isSuccess: isPutSuccess, data: putData }] =
    usePutUserWordMutation();

  useEffect(() => {
    console.log(isPostSuccess, isPutSuccess);
  }, [postWord, putWord]);

  const bodyE = {
    difficulty: 'false',
    optional: {
      learningProgress: 0,
      percentCorrectAnswers: 0,
      isNew: false,
      isLearned: true,
    },
  };

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
        </Space>
        {validation ? (
          <Space className="buttons">
            <button
              onClick={() => {
                isWord
                  ? putWord({
                      wordId: word?.id,
                      body: {
                        difficulty: 'true',
                        optional: {
                          learningProgress: 0,
                          percentCorrectAnswers: 0,
                          isNew: false,
                          isLearned: true,
                        },
                      },
                    })
                  : postWord({
                      wordId: word?.id,
                      body: bodyE,
                    });
              }}
            >
              + в изученое слово
            </button>
            <button>+ в сложное слово</button>
          </Space>
        ) : (
          ''
        )}
        import CurrentWord
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
