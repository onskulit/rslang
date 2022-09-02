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
import {
  IStatisticData,
  IUserStatisticsResponse,
  IWord,
} from '../../../types/interfaces';
import { ButtonRounded } from '../../buttons/Buttons';
import ResultMessage from '../../gameOverMessage/ResultMessage';
import { TitleLevel3, TitleLevel4 } from '../../typography/Titles';
import GameResultTable from './gameResultTable/GameResultTable';

interface GameResultProps {
  result?: number;
  game: GamesType;
  correctWords: IWord[];
  wrongWords: IWord[];
  maxStreak: number;
}

function GameResult({
  result,
  game,
  correctWords,
  wrongWords,
  maxStreak,
}: GameResultProps) {
  const userData = JSON.parse(storage.get(STORAGE_KEY.userAuthData));
  const { data, error } = statisticsAPI.useGetDailyStatisticsQuery({
    userId: userData ? userData.userId : '',
    token: userData ? userData.token : '',
  });
  const [updateDailyStatistics] = useUpdateDailyStatisticsMutation();
  const gameInfo = gamesInfo[game];
  const dispatch = useAppDispatch();

  const updateStatistics = useMemo(
    () => async (statistics: IStatisticData) => {
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
      currentGame.maxStreak =
        currentGame.maxStreak > maxStreak ? currentGame.maxStreak : maxStreak;
      currentGame.rightWords += correctWords.length;
      currentGame.wrongWords += wrongWords.length;
      console.log(statisticsCopy);
      await updateDailyStatistics({
        userId: userData.userId,
        token: userData.token,
        body: statisticsCopy,
      });
    },
    []
  );

  const createStatistics = () => {
    const statistics = initialStatistics;
    updateStatistics(statistics);
  };

  useEffect(() => {
    dispatch(updateGameStatus(false));
  }, []);

  useEffect(() => {
    if (error) {
      const typedError = error as FetchBaseQueryError;
      const status = typedError.status;
      if (status === 'PARSING_ERROR') {
        if (typedError.originalStatus === 404) {
          createStatistics();
        }
      }
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      updateStatistics({
        learnedWords: data.learnedWords,
        optional: data.optional,
      });
    }
  }, [data]);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', marginBottom: 40 }}
    >
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
