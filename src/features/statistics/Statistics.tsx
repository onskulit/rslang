import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../common/components/ErrorMessage';
import { TitleLevel3 } from '../../common/components/typography/Titles';
import { STORAGE_KEY } from '../../common/constants/localStorage';
import { GamesType } from '../../common/types/enums';
import { storage } from '../../common/utils/localStorage';
import { statisticsAPI } from '../api/statisticsSlice';
import AllTimeStatistics from './allTimeStatistics/AllTimeStatistics';
import DailyStatisticsGame from './dailyStatistics/DailyStatisticsGame';
import DailyStatisticsWords from './dailyStatistics/DailyStatisticsWords';

function Statistics() {
  const [errorMessage, setErrorMessage] = useState(
    'К сожалению, мы не смогли получить вашу статистику. Вероятно, вы не авторизованы'
  );
  const userData = JSON.parse(storage.get(STORAGE_KEY.userAuthData));
  const { data, isError, error, isSuccess } =
    statisticsAPI.useGetDailyStatisticsQuery({
      userId: userData ? userData.userId : '',
      token: userData ? userData.token : '',
    });

  useEffect(() => {
    if (error) {
      const typedError = error as FetchBaseQueryError;
      const status = typedError.status;
      if (status === 'PARSING_ERROR') {
        if (typedError.originalStatus === 404) {
          setErrorMessage(
            'У вас пока нет статистики. Сыграйте в какую-нибудь игру!'
          );
        }
      }
    }
  }, [error]);
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', alignItems: 'center', paddingTop: 20 }}
    >
      {!!isError && <ErrorMessage error={errorMessage} />}
      {isSuccess && (
        <>
          <TitleLevel3>Статистика (сегодня)</TitleLevel3>
          <DailyStatisticsGame game={GamesType.sprint} statistics={data} />
          <DailyStatisticsGame game={GamesType.audition} statistics={data} />
          <DailyStatisticsWords statistics={data} />
          <TitleLevel3>Статистика (За всё время)</TitleLevel3>
          <AllTimeStatistics statistics={data} />
        </>
      )}
    </Space>
  );
}

export default Statistics;
