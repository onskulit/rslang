import { Col, Progress, Row } from 'antd';
import { useMemo } from 'react';
import StatisticsCard from '../../../common/components/statistics/statisticsCard/StatisticsCard';
import { TitleLevel4 } from '../../../common/components/typography/Titles';
import { GamesType } from '../../../common/types/enums';
import { IUserStatisticsResponse } from '../../../common/types/interfaces';
import { getCurrentDate } from '../../../common/utils/getCurrentDate';
import { getPercentOfRightAnswers } from '../../../common/utils/getPercentOfRightAnswers';
import styles from './DailyStatistics.module.css';

interface DailyStatisticsGameProps {
  statistics: IUserStatisticsResponse;
}

function DailyStatisticsWords({ statistics }: DailyStatisticsGameProps) {
  const todaysStatistics = useMemo(
    () => statistics.optional.daily[getCurrentDate()],
    [statistics]
  );

  const todaysWordsStatistics = useMemo(() => {
    if (todaysStatistics) {
      let isAnyPlayed = false;
      let newWords = 0;
      const learnedWords = todaysStatistics.learnedWords;
      let rightAnswers = 0;
      let wrongAnswers = 0;
      if (todaysStatistics) {
        Object.values(GamesType).forEach((game) => {
          const currentGame = todaysStatistics[game];
          if (currentGame.isPlayed) {
            isAnyPlayed = true;
            newWords += currentGame.newWordsAmount;
            rightAnswers += currentGame.rightWords;
            wrongAnswers += currentGame.wrongWords;
          }
        });
      }
      return {
        isAnyPlayed,
        newWords,
        learnedWords,
        rightAnswers,
        wrongAnswers,
      };
    }
  }, [todaysStatistics]);

  return (
    <StatisticsCard>
      <Row justify="center">
        <TitleLevel4>Статистика по словам</TitleLevel4>
      </Row>
      <Row justify="center" align="top">
        {!todaysStatistics || !todaysWordsStatistics?.isAnyPlayed ? (
          <Row
            justify="center"
            style={{
              paddingTop: 40,
              height: '100%',
              fontSize: 16,
              textAlign: 'center',
            }}
          >
            Похоже, что сегодня вы ещё не занимались
          </Row>
        ) : (
          <>
            <Col span={8}>
              <Row className={`${styles.result}`}>
                {todaysWordsStatistics.newWords}
              </Row>
              <Row className={`${styles.resultInfo}`}>новых слов за день</Row>
            </Col>
            <Col span={8}>
              <Row className={`${styles.result}`}>
                {todaysWordsStatistics.learnedWords}
              </Row>
              <Row className={`${styles.resultInfo}`}>
                изученных слов за день
              </Row>
            </Col>
            <Col span={8}>
              <Row className={`${styles.result}`}>
                <Progress
                  type="circle"
                  percent={getPercentOfRightAnswers(
                    todaysWordsStatistics.rightAnswers,
                    todaysWordsStatistics.wrongAnswers
                  )}
                  width={80}
                  status="normal"
                />
              </Row>
              <Row className={`${styles.resultInfo}`}>
                правильных ответов за день
              </Row>
            </Col>
          </>
        )}
      </Row>
    </StatisticsCard>
  );
}

export default DailyStatisticsWords;
