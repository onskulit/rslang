import { Card, Col, Progress, Row, Space } from 'antd';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';
import gamesInfo from '../../../common/constants/gamesInfo';
import { GamesType } from '../../../common/types/enums';
import {
  IStatisticData,
  IUserStatisticsResponse,
} from '../../../common/types/interfaces';
import { getCurrentDate } from '../../../common/utils/getDate';

interface DailyStatisticsGameProps {
  game: GamesType;
  statistics: IUserStatisticsResponse;
}

const getPercentOfRightAnswers = (right: number, wrong: number) => {
  return (right / (right + wrong)) * 100;
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
              <Row justify="center" align="middle" style={{ height: 100 }}>
                {todaysStatistics[game].newWordsAmount}
              </Row>
              <Row justify="center">новых слов за день</Row>
            </Col>
            <Col span={8}>
              <Row justify="center" align="middle" style={{ height: 100 }}>
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
              <Row justify="center">Правильных ответов</Row>
            </Col>
            <Col span={8}>
              <Row justify="center" align="middle" style={{ height: 100 }}>
                {todaysStatistics[game].maxStreak}
              </Row>
              <Row justify="center">Лучшая серия</Row>
            </Col>
          </Row>
        </>
      )}
    </StatisticsCard>
  );
}

export default DailyStatisticsGame;
