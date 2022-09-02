import { Row, Space } from 'antd';
import { useEffect } from 'react';
import { TitleLevel3 } from '../../common/components/typography/Titles';
import { STORAGE_KEY } from '../../common/constants/localStorage';
import { GamesType } from '../../common/types/enums';
import { storage } from '../../utils/localStorage';
import { statisticsAPI } from '../api/statisticsSlice';
import DailyStatisticsGame from './dailyStatistics/DailyStatisticsGame';
import DailyStatisticsWords from './dailyStatistics/DailyStatisticsWords';

function Statistics() {
  const userData = JSON.parse(storage.get(STORAGE_KEY.userAuthData));
  const { data, isError, isSuccess } = statisticsAPI.useGetDailyStatisticsQuery(
    {
      userId: userData ? userData.userId : '',
      token: userData ? userData.token : '',
    }
  );

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {!!isError && (
        <Row justify="center">
          К сожалению, мы не смогли получить вашу статистику
        </Row>
      )}
      {isSuccess && (
        <>
          <TitleLevel3>Статистика</TitleLevel3>
          <DailyStatisticsGame game={GamesType.sprint} statistics={data.body} />
          <DailyStatisticsGame
            game={GamesType.audition}
            statistics={data.body}
          />
          <DailyStatisticsWords statistics={data.body} />
        </>
      )}
    </Space>
  );
}

export default Statistics;
