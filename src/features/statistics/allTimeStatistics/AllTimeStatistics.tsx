import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { IUserStatisticsResponse } from '../../../common/types/interfaces';
import { Space } from 'antd';
import { getCurrentDate } from '../../../common/utils/getCurrentDate';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import StatisticsChart from '../../../common/components/statistics/StatisticsChart/StatisticsChart';

const cardStyles = { width: 700, height: 500 };

interface AllTimeStatisticsProps {
  statistics: IUserStatisticsResponse;
}

const minPeriod = 7;

function AllTimeStatistics({ statistics }: AllTimeStatisticsProps) {
  const prolongDates = useMemo(
    () => (difference: number, dates: string[]) => {
      const previosDates = [];
      for (let i = difference; i > 0; i--) {
        const dayInMS = 86400000;
        const firstDay = 86400000 * (dates.length - 1);
        const day = new Date(Date.now() - firstDay - i * dayInMS);
        previosDates.push(getCurrentDate(day));
      }
      return [...previosDates, ...dates];
    },
    []
  );

  const prolongWithZeros = useMemo(
    () => (difference: number, array: number[]) => {
      const zeros = [];
      for (let i = 0; i < difference; i++) {
        zeros.push(0);
      }
      return [...zeros, ...array];
    },
    []
  );

  const { dates, learnedWords, progressPerDay } = useMemo(() => {
    const statisticsPerDays = statistics.optional.daily;
    let dates = Object.keys(statisticsPerDays);
    let learnedWords = Object.keys(statisticsPerDays).map(
      (day) => statisticsPerDays[day].learnedWords
    );
    let progress = 0;
    let progressPerDay = Object.keys(statisticsPerDays).map((day) => {
      progress += statisticsPerDays[day].learnedWords;
      if (!progress) progress = 0;
      return progress;
    });
    /*     let dates = ['01.09.2022', '02.09.2022', '03.09.2022', '04.09.2022'];
    let learnedWords = [4, 4, 6, 5];
    let progressPerDay = [4, 8, 14, 19]; */
    if (dates.length < minPeriod) {
      const difference = minPeriod - dates.length;
      dates = prolongDates(difference, dates);
      learnedWords = prolongWithZeros(difference, learnedWords);
      progressPerDay = prolongWithZeros(difference, progressPerDay);
    }
    return { dates, learnedWords, progressPerDay };
  }, []);
  return (
    <Space size="middle" direction="vertical" align="center">
      <StatisticsCard style={cardStyles}>
        <StatisticsChart
          labels={dates}
          datasetLabel="Выученные слова"
          data={learnedWords}
          datasetColor="#e94e99"
          yTitle="Слов за день"
        />
      </StatisticsCard>
      <StatisticsCard style={cardStyles}>
        <StatisticsChart
          labels={dates}
          datasetLabel="Прогресс изучения"
          data={progressPerDay}
          datasetColor="#5855f2"
          yTitle="Слов за весь период"
        />
      </StatisticsCard>
    </Space>
  );
}

export default AllTimeStatistics;
