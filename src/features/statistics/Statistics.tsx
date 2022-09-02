import { Space } from 'antd';
import { TitleLevel3 } from '../../common/components/typography/Titles';
import DailyStatistics from './dailyStatistics/DailyStatistics';

function Statistics() {
  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <TitleLevel3>Статистика</TitleLevel3>
      <DailyStatistics />
      <DailyStatistics />
      <DailyStatistics />
    </Space>
  );
}

export default Statistics;
