import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { DifficultyLevel } from '../../common/types/enums';
import { useEffect } from 'react';

function Sprint() {
  const { data, isFetching, error } = apiSlice.useGetWordsForGroupQuery({
    group: DifficultyLevel.LEVEL_0,
    page: 29,
  });
  const { resetGame, createPares, checkAnswer } = sprintSlice.actions;
  const {
    words,
    currentWord,
    totalScore,
    streak,
    isFinished,
    pointsForCorrectAnswer,
  } = useAppSelector((state: RootState) => state.sprint);
  const dispatch = useAppDispatch();

  const startGame = () => {
    dispatch(resetGame());
    if (data) {
      dispatch(createPares(data));
    }
  };

  useEffect(() => {
    startGame();
  }, [data]);

  return (
    <div>
      {isFetching && <div>Загрузка...</div>}
      {error && <div>Ошибка</div>}
      {words.length > 0 && (
        <>
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
