import { Card, Col, Progress, Row, Space } from 'antd';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';
import { IStatisticData } from '../../../common/types/interfaces';

interface DailyStatisticsGameProps {
  statistics: IStatisticData;
}

function DailyStatisticsWords({ statistics }: DailyStatisticsGameProps) {
  return (
    <StatisticsCard>
      <Row justify="center">
        <TitleLevel4>GameName</TitleLevel4>
      </Row>
      <Row justify="center" align="bottom">
        <Col span={8}>
          <Row justify="center" align="middle" style={{ height: 100 }}>
            Значение
          </Row>
          <Row justify="center">новых слов за день</Row>
        </Col>
        <Col span={8}>
          <Row justify="center" align="middle" style={{ height: 100 }}>
            Значение
          </Row>
          <Row justify="center">изученных слов за день</Row>
        </Col>
        <Col span={8}>
          <Row justify="center" align="middle" style={{ height: 100 }}>
            Значение
          </Row>
          <Row justify="center">правильных ответов за день</Row>
        </Col>
      </Row>
    </StatisticsCard>
  );
}

export default DailyStatisticsWords;
