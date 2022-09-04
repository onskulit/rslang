import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { IUserStatisticsResponse } from '../../../common/types/interfaces';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';
import { Space } from 'antd';
import { getCurrentDate } from '../../../common/utils/getCurrentDate';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

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
      return progress;
    });
    if (dates.length < minPeriod) {
      const difference = minPeriod - dates.length;
      dates = prolongDates(difference, dates);
      learnedWords = prolongWithZeros(difference, learnedWords);
      progressPerDay = prolongWithZeros(difference, progressPerDay);
    }
    return { dates, learnedWords, progressPerDay };
  }, []);
  return (
    <Space size="middle" direction="vertical">
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Выученные слова',
              data: learnedWords,
              backgroundColor: '#e94e99',
              borderColor: '#e94e99',
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              suggestedMin: 0,
            },
          },
        }}
        width={700}
        height={400}
      />
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              label: 'Прогресс изучения',
              data: progressPerDay,
              backgroundColor: '#5855f2',
              borderColor: '#5855f2',
            },
          ],
        }}
        options={{
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              suggestedMin: 0,
            },
          },
        }}
        width={700}
        height={400}
      />
    </Space>
  );
}

export default AllTimeStatistics;
