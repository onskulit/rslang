import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { DifficultyLevel, GamesType } from '../../common/types/enums';
import { useEffect } from 'react';
import Loader from '../../common/components/Loader';
import ErrorMessage from '../../common/components/ErrorMessage';
import GameResult from '../../common/components/games/GameResult';
import { Button, Row } from 'antd';

interface SprintProps {
  maxPage?: number;
  group?: DifficultyLevel;
}

function Sprint({
  maxPage = 29,
  group = DifficultyLevel.LEVEL_0,
}: SprintProps) {
  const { data, isFetching, isError } = apiSlice.useGetWordsForGroupQuery({
    group,
    page: maxPage,
  });
  const { resetGame, createPares, checkAnswer, decreaseTimer, startGame } =
    sprintSlice.actions;
  const {
    words,
    currentWord,
    totalScore,
    streak,
    secondsLeft,
    isFinished,
    isStarted,
    pointsForCorrectAnswer,
  } = useAppSelector((state: RootState) => state.sprint);
  const dispatch = useAppDispatch();

  const setGame = () => {
    dispatch(resetGame());
    if (data) {
      dispatch(createPares(data));
    }
    dispatch(startGame());
  };

  useEffect(() => {
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

  return (
    <div>
      {isFetching && <Loader />}
      {isError && <ErrorMessage error="Что-то пошло не так" />}
      {isStarted && (
        <>
          <Row justify="center">{`Осталось ${secondsLeft} секунд`}</Row>
          <Row justify="center">{`Всего очков: ${totalScore}`}</Row>
          <Row justify="center">{`Streak: ${streak}`}</Row>
          <Row justify="center">{`+${pointsForCorrectAnswer} за правильный ответ`}</Row>
          <Row justify="center">{`${words[currentWord][0].word} | ${words[currentWord][1]}`}</Row>
          <Row justify="center">
            <Button onClick={() => dispatch(checkAnswer(true))}>Верно</Button>
            <Button onClick={() => dispatch(checkAnswer(false))}>
              Неверно
            </Button>
          </Row>
        </>
      )}
      {isFinished && <GameResult game={GamesType.sprint} result={totalScore} />}
    </div>
  );
}

export default Sprint;
