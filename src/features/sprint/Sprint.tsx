import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { GamesType } from '../../common/types/enums';
import { useEffect } from 'react';
import Loader from '../../common/components/Loader';
import ErrorMessage from '../../common/components/ErrorMessage';
import GameResult from '../../common/components/games/gameResult/GameResult';
import { Progress, Row, Space, Typography } from 'antd';
import { TitleLevel4 } from '../../common/components/typography/Titles';
import { ButtonRounded } from '../../common/components/buttons/Buttons';
import GameCloser from '../../common/components/games/GameCloser';

interface SprintProps {
  maxPage?: number;
}

const { Text } = Typography;

function Sprint({ maxPage = 29 }: SprintProps) {
  const { value: group } = useAppSelector(
    (state: RootState) => state.difficulty
  );
  const { data, isFetching, isError } = apiSlice.useGetWordsForGroupQuery({
    group,
    page: maxPage,
  });
  const { resetGame, createPares, checkAnswer, decreaseTimer, startGame } =
    sprintSlice.actions;
  const {
    words,
    correctWords,
    wrongWords,
    currentWordPos,
    totalScore,
    streakMultiplicity,
    streakProgress,
    streakColor,
    secondsLeft,
    progressRoundPercent,
    isFinished,
    isStarted,
    pointsForCorrectAnswer,
  } = useAppSelector((state: RootState) => state.sprint);
  const dispatch = useAppDispatch();

  const setGame = () => {
    if (data) {
      dispatch(createPares(data));
    }
    dispatch(startGame());
  };

  useEffect(() => {
    dispatch(resetGame());
    if (data) {
      setGame();
    }
  }, [data]);

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (isStarted) {
      id = setTimeout(() => {
        dispatch(decreaseTimer());
      }, 1000);

      return () => clearTimeout(id);
    }
  }, [isStarted, secondsLeft]);

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') dispatch(checkAnswer(true));
      if (event.key === 'ArrowRight') dispatch(checkAnswer(false));
    };
    if (isStarted) {
      document.addEventListener('keyup', keyUpHandler);
    }

    return () => document.removeEventListener('keyup', keyUpHandler);
  }, [isStarted]);

  return (
    <div>
      {isFetching && <Loader />}
      {isError && <ErrorMessage error="Что-то пошло не так" />}
      {isStarted && (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <GameCloser />
          <Row justify="center">
            <Space>
              <Progress
                type="circle"
                percent={progressRoundPercent}
                format={() => secondsLeft}
                width={80}
                status="normal"
                strokeColor={secondsLeft <= 10 ? 'red' : ''}
              />
              <Progress
                type="circle"
                percent={streakProgress}
                format={() => `X${streakMultiplicity}`}
                width={80}
                status="normal"
                strokeColor={streakColor}
              />
            </Space>
          </Row>
          <Row justify="center">
            <TitleLevel4>{`Всего очков: ${totalScore} (+${pointsForCorrectAnswer} за слово)`}</TitleLevel4>
          </Row>
          <Row justify="center">
            <Space
              direction="vertical"
              align="center"
              style={{ display: 'flex' }}
            >
              <Text strong style={{ fontSize: 30 }}>
                {words[currentWordPos][0].word}
              </Text>
              <Text type="secondary" style={{ fontSize: 26 }}>
                {words[currentWordPos][1]}
              </Text>
            </Space>
          </Row>
          <Row justify="center">
            <Space>
              <ButtonRounded onClick={() => dispatch(checkAnswer(true))}>
                Верно
              </ButtonRounded>
              <ButtonRounded onClick={() => dispatch(checkAnswer(false))}>
                Неверно
              </ButtonRounded>
            </Space>
          </Row>
        </Space>
      )}
      {isFinished && (
        <GameResult
          game={GamesType.sprint}
          result={totalScore}
          correctWords={correctWords}
          wrongWords={wrongWords}
        />
      )}
    </div>
  );
}

export default Sprint;
