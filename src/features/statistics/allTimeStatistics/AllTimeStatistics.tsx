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
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';

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

Chart.defaults.font.size = 16;
Chart.defaults.font.family = '"Noto Sans", sans-serif';

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
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Слов за день',
                },
                suggestedMax: 10,
                min: 0,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      </StatisticsCard>
      <StatisticsCard style={cardStyles}>
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
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: 'Слов за весь период',
                },
                suggestedMax: 10,
                min: 0,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      </StatisticsCard>
    </Space>
  );
}

export default AllTimeStatistics;
