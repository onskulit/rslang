import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Row, Space } from 'antd';
import { useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import {
  statisticsAPI,
  useUpdateDailyStatisticsMutation,
} from '../../../../features/api/statisticsSlice';
import { updateGameStatus } from '../../../../features/gameStatus/gameStatusSlice';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { storage } from '../../../../utils/localStorage';
import {
  initialDailyStatistics,
  initialStatistics,
} from '../../../constants/initialStatistics';
import gamesInfo from '../../../constants/gamesInfo';
import { STORAGE_KEY } from '../../../constants/localStorage';
import { GamesType } from '../../../types/enums';
import { IStatisticData, IUserWord, IWord } from '../../../types/interfaces';
import { ButtonRounded } from '../../buttons/Buttons';
import ResultMessage from '../../gameOverMessage/ResultMessage';
import { TitleLevel3, TitleLevel4 } from '../../typography/Titles';
import GameResultTable from './gameResultTable/GameResultTable';
import { useLazyGetUserWordQuery } from '../../../../features/api/userSlice';
import { initialWordInfo } from '../../../constants/initialWordInfo';

interface GameResultProps {
  result?: number;
  game: GamesType;
  correctWords: IWord[];
  wrongWords: IWord[];
  maxStreak: number;
}

const wordsToLearnEasy = 3;
const wordsToLearnDifficult = 5;

function GameResult({
  result,
  game,
  correctWords,
  wrongWords,
  maxStreak,
}: GameResultProps) {
  const userData = JSON.parse(storage.get(STORAGE_KEY.userAuthData));
  const {
    data: statistics,
    isSuccess,
    error: statisticsError,
  } = statisticsAPI.useGetDailyStatisticsQuery({
    userId: userData ? userData.userId : '',
    token: userData ? userData.token : '',
  });
  const [getUserWord] = useLazyGetUserWordQuery();
  const [updateDailyStatistics] = useUpdateDailyStatisticsMutation();

  const gameInfo = useMemo(() => gamesInfo[game], []);

  const dispatch = useAppDispatch();

  const updateWordInfo = useMemo(
    () => (id: string, wordInfo: IUserWord, isRightAnswer: boolean) => {
      const wordInfoCopy = JSON.parse(JSON.stringify(wordInfo)) as IUserWord;
      if (isRightAnswer) {
        if (!wordInfoCopy.optional.isLearned)
          wordInfoCopy.optional.learningProgress++;
        if (wordInfoCopy.difficulty) {
          if (wordInfoCopy.optional.learningProgress >= wordsToLearnDifficult)
            wordInfoCopy.optional.isLearned = true;
        } else {
          if (wordInfoCopy.optional.learningProgress >= wordsToLearnEasy)
            wordInfoCopy.optional.isLearned = true;
        }
      } else {
        if (wordInfoCopy.optional.learningProgress) {
          wordInfoCopy.optional.learningProgress--;
          if (wordInfoCopy.difficulty) {
            if (wordInfoCopy.optional.learningProgress < wordsToLearnDifficult)
              wordInfoCopy.optional.isLearned = false;
          } else {
            if (wordInfoCopy.optional.learningProgress < wordsToLearnEasy)
              wordInfoCopy.optional.isLearned = false;
          }
        }
      }
      return { isLearned: wordInfoCopy.optional.isLearned };
    },
    []
  );

  const setWordInfo = useMemo(
    () => async (isRightAnswer: boolean, id: string) => {
      const wordInfoStatistics = {
        isNew: false,
        isLearned: false,
      };
      const response = await getUserWord({ wordId: id });

      if (response.error) {
        const typedError = response.error as FetchBaseQueryError;
        const status = typedError.status;
        if (status === 'PARSING_ERROR') {
          if (typedError.originalStatus === 404) {
            wordInfoStatistics.isNew = true;
            const { isLearned } = updateWordInfo(
              id,
              { ...initialWordInfo },
              isRightAnswer
            );
            if (isLearned) wordInfoStatistics.isLearned = true;
          }
        }
      }
      if (response.data) {
        const { isLearned } = updateWordInfo(id, response.data, isRightAnswer);
        if (isLearned) wordInfoStatistics.isLearned = true;
      }

      return wordInfoStatistics;
    },
    []
  );
  const updateWordsInfo = useMemo(
    () => async () => {
      const wordsInfoStatistics = { newWords: 0, learnedWords: 0 };
      correctWords.forEach(async (word) => {
        const { isNew, isLearned } = await setWordInfo(true, word.id);
        if (isNew) wordsInfoStatistics.newWords++;
        if (isLearned) wordsInfoStatistics.learnedWords++;
      });
      wrongWords.forEach(async (word) => {
        const { isNew, isLearned } = await setWordInfo(false, word.id);
        if (isNew) wordsInfoStatistics.newWords++;
        if (isLearned) wordsInfoStatistics.learnedWords++;
      });
      return wordsInfoStatistics;
    },
    []
  );

  const updateStatistics = useMemo(
    () => async (statistics: IStatisticData) => {
      const wordsStatistics = await updateWordsInfo();
      const statisticsCopy = JSON.parse(
        JSON.stringify(statistics)
      ) as IStatisticData;
      const todayStatistics = statisticsCopy.optional.daily[getCurrentDate()];
      if (!todayStatistics) {
        statisticsCopy.optional.daily[getCurrentDate()] = {
          ...initialDailyStatistics,
        };
      }
      const currentGame = statisticsCopy.optional.daily[getCurrentDate()][game];
      currentGame.isPlayed = true;
      currentGame.maxStreak =
        currentGame.maxStreak > maxStreak ? currentGame.maxStreak : maxStreak;
      currentGame.rightWords += correctWords.length;
      currentGame.wrongWords += wrongWords.length;
      await updateDailyStatistics({
        userId: userData.userId,
        token: userData.token,
        body: statisticsCopy,
      });
    },
    []
  );

  const createStatistics = useMemo(
    () => () => {
      const statistics = initialStatistics;
      updateStatistics(statistics);
    },
    []
  );

  useEffect(() => {
    dispatch(updateGameStatus(false));
  }, []);

  useEffect(() => {
    if (statisticsError) {
      const typedError = statisticsError as FetchBaseQueryError;
      const status = typedError.status;
      if (status === 'PARSING_ERROR') {
        if (typedError.originalStatus === 404) {
          createStatistics();
        }
      }
    }
  }, [statisticsError]);

  useEffect(() => {
    if (isSuccess) {
      updateStatistics({
        learnedWords: statistics.learnedWords,
        optional: statistics.optional,
      });
    }
  }, [isSuccess]);

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Row justify="center">
        <TitleLevel3>Игра окончена!</TitleLevel3>
      </Row>
      <Row justify="center">
        {result && (
          <TitleLevel4>
            Ваш результат в игре {gameInfo.name}: {result}
          </TitleLevel4>
        )}
        {!result && <ResultMessage wrongWords={wrongWords} />}
      </Row>
      <>
        {!!correctWords.length && (
          <GameResultTable
            title="Правильные ответы:"
            words={correctWords}
            style={{ borderColor: 'green' }}
          />
        )}

        {!!wrongWords.length && (
          <GameResultTable
            title="Неправильные ответы:"
            words={wrongWords}
            style={{ borderColor: 'red' }}
          />
        )}
      </>
      <Row justify="center">
        <Space>
          <NavLink to={gameInfo.pathWithMenu}>
            <ButtonRounded style={{ width: 200 }}>Сыграть снова</ButtonRounded>
          </NavLink>
          <NavLink to="/">
            <ButtonRounded style={{ width: 200 }}>На Главную</ButtonRounded>
          </NavLink>
        </Space>
      </Row>
    </Space>
  );
}

export default GameResult;
