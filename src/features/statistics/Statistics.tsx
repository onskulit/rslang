import { Space } from 'antd';
import DailyStatistics from './dailyStatistics/DailyStatistics';

function Statistics() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <DailyStatistics />
      <DailyStatistics />
      <DailyStatistics />
    </Space>
  );
}

export default Statistics;
