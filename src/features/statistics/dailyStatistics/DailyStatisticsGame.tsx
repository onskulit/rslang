import { Col, Progress, Row } from 'antd';
import { useMemo } from 'react';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';
import gamesInfo from '../../../common/constants/gamesInfo';
import { GamesType } from '../../../common/types/enums';
import { IUserStatisticsResponse } from '../../../common/types/interfaces';
import { getCurrentDate } from '../../../common/utils/getCurrentDate';
import styles from './DailyStatistics.module.css';

interface DailyStatisticsGameProps {
  game: GamesType;
  statistics: IUserStatisticsResponse;
}

const getPercentOfRightAnswers = (right: number, wrong: number) => {
  return Math.round((right / (right + wrong)) * 100);
};
function DailyStatisticsGame({ game, statistics }: DailyStatisticsGameProps) {
  const gameInfo = gamesInfo[game];

  const todaysStatistics = statistics.optional.daily[getCurrentDate()];
  return (
    <StatisticsCard>
      <Row justify="center">
        <TitleLevel4>{gameInfo.name}</TitleLevel4>
      </Row>
      {!todaysStatistics && (
        <Row justify="center">
          Похоже, что сегодня вы не играли в {gameInfo.name}
        </Row>
      )}
      {!!todaysStatistics && (
        <>
          <Row justify="center" align="bottom">
            <Col span={8}>
              <Row className={`${styles.gameResult}`}>
                {todaysStatistics[game].newWordsAmount}
              </Row>
              <Row className={`${styles.gameResultInfo}`}>
                новых слов за день
              </Row>
            </Col>
            <Col span={8}>
              <Row className={`${styles.gameResult}`}>
                {
                  <Progress
                    type="circle"
                    percent={getPercentOfRightAnswers(
                      todaysStatistics[game].rightWords,
                      todaysStatistics[game].wrongWords
                    )}
                    width={80}
                    status="normal"
                  />
                }
              </Row>
              <Row className={`${styles.gameResultInfo}`}>
                правильных ответов
              </Row>
            </Col>
            <Col span={8}>
              <Row className={`${styles.gameResult}`}>
                {todaysStatistics[game].maxStreak}
              </Row>
              <Row className={`${styles.gameResultInfo}`}>Лучшая серия</Row>
            </Col>
          </Row>
        </>
      )}
    </StatisticsCard>
  );
}

export default DailyStatisticsGame;
