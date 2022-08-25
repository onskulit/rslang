import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { GamesType } from '../../common/types/enums';
import { useEffect } from 'react';
import Loader from '../../common/components/Loader';
import ErrorMessage from '../../common/components/ErrorMessage';
import GameResult from '../../common/components/games/gameResult/GameResult';
import { Button, Progress, Row, Space } from 'antd';

interface SprintProps {
  maxPage?: number;
}

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
    currentWord,
    totalScore,
    streakMultiplicity,
    secondsLeft,
    progressSec,
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
          <Row justify="center">
            <Progress
              type="circle"
              percent={progressSec}
              format={() => secondsLeft}
              width={60}
              status="normal"
              strokeColor={secondsLeft <= 10 ? 'red' : '#1890ff'}
            />
          </Row>
          <Row justify="center">{`Всего очков: ${totalScore}`}</Row>
          <Row justify="center">{`X${streakMultiplicity}`}</Row>
          <Row justify="center">{`+${pointsForCorrectAnswer} за правильный ответ`}</Row>
          <Row justify="center">{`${words[currentWord][0].word} | ${words[currentWord][1]}`}</Row>
          <Row justify="center">
            <Button onClick={() => dispatch(checkAnswer(true))}>Верно</Button>
            <Button onClick={() => dispatch(checkAnswer(false))}>
              Неверно
            </Button>
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
