import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { DifficultyLevel } from '../../common/types/enums';
import { useEffect } from 'react';
import Loader from '../../common/components/Loader';
import ErrorMessage from '../../common/components/ErrorMessage';

function Sprint() {
  const { data, isFetching, isError } = apiSlice.useGetWordsForGroupQuery({
    group: DifficultyLevel.LEVEL_0,
    page: 29,
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
    if (isStarted) {
      setTimeout(() => {
        dispatch(decreaseTimer());
      }, 1000);
    }
  }, [isStarted, secondsLeft]);

  return (
    <div>
      {isFetching && <Loader />}
      {isError && <ErrorMessage error="Что-то пошло не так" />}
      {words.length > 0 && (
        <>
          <div>{`Seconds left: ${secondsLeft}`}</div>
          <div>{`Total Score: ${totalScore}`}</div>
          <div>{`Streak: ${streak}`}</div>
          <div>{`+${pointsForCorrectAnswer} for correct answer`}</div>
          <div>{`${words[currentWord][0]} | ${words[currentWord][1]}`}</div>
        </>
      )}
      {isFinished ? (
        <div>Game is Finished</div>
      ) : (
        <div>
          <button onClick={() => dispatch(checkAnswer(true))}>Верно</button>
          <button onClick={() => dispatch(checkAnswer(false))}>Неверно</button>
        </div>
      )}
    </div>
  );
}

export default Sprint;
