import { Col, Row } from 'antd';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';
import { IUserStatisticsResponse } from '../../../common/types/interfaces';
import styles from './DailyStatistics.module.css';

interface DailyStatisticsGameProps {
  statistics: IUserStatisticsResponse;
}

function DailyStatisticsWords({ statistics }: DailyStatisticsGameProps) {
  return (
    <StatisticsCard>
      <Row justify="center">
        <TitleLevel4>Статистика по словам</TitleLevel4>
      </Row>
      <Row justify="center" align="top">
        <Col span={8}>
          <Row className={`${styles.gameResult}`}>Значение</Row>
          <Row className={`${styles.gameResultInfo}`}>новых слов за день</Row>
        </Col>
        <Col span={8}>
          <Row className={`${styles.gameResult}`}>Значение</Row>
          <Row className={`${styles.gameResultInfo}`}>
            изученных слов за день
          </Row>
        </Col>
        <Col span={8}>
          <Row className={`${styles.gameResult}`}>Значение</Row>
          <Row className={`${styles.gameResultInfo}`}>
            правильных ответов за день
          </Row>
        </Col>
      </Row>
    </StatisticsCard>
  );
}

export default DailyStatisticsWords;
