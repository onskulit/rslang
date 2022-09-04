import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
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

interface StatisticsChartProps {
  labels: string[];
  datasetLabel: string;
  data: string[] | number[];
  datasetColor: string;
  yTitle: string;
}

const minPeriod = 7;

function StatisticsChart({
  labels,
  datasetLabel,
  data,
  datasetColor,
  yTitle,
}: StatisticsChartProps) {
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: datasetLabel,
            data: data,
            backgroundColor: datasetColor,
            borderColor: datasetColor,
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
              text: yTitle,
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
  );
}

export default StatisticsChart;
