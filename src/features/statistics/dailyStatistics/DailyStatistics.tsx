import { Card, Col, Progress, Row, Space } from 'antd';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';

function DailyStatistics() {
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
            <Progress type="circle" percent={90} width={80} status="normal" />
          </Row>
          <Row justify="center">Правильных ответов</Row>
        </Col>
        <Col span={8}>
          <Row justify="center" align="middle" style={{ height: 100 }}>
            Значение
          </Row>
          <Row justify="center">Лучшая серия</Row>
        </Col>
      </Row>
    </StatisticsCard>
  );
}

export default DailyStatistics;
