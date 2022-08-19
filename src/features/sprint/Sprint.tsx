import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { DifficultyLevel } from '../../common/types/enums';
import { useEffect } from 'react';

function Sprint() {
  const { data, isFetching, isSuccess } = apiSlice.useGetWordsQuery({
    group: DifficultyLevel.LEVEL_0,
    page: 0,
  });
  const { createPares, checkAnswer } = sprintSlice.actions;
  const { words, currentWord, totalScore, streak } = useAppSelector(
    (state: RootState) => state.sprint
  );
  const dispatch = useAppDispatch();

  const updateWords = async () => {
    await data;
    if (data) dispatch(createPares(data));
  };

  useEffect(() => {
    updateWords();
  }, []);

  return (
    <div>
      {isFetching && <div>Загрузка...</div>}
      {isSuccess && !words.length && <div>Слова не загрузились</div>}
      {words.length > 0 && (
        <>
          <div>{`Total Score: ${totalScore}`}</div>
          <div>{`Steak: ${streak}`}</div>
          <div>{`${words[currentWord][0]} | ${words[currentWord][1]}`}</div>
        </>
      )}
      <div>
        <button onClick={() => dispatch(checkAnswer(true))}>Верно</button>
        <button onClick={() => dispatch(checkAnswer(false))}>Неверно</button>
      </div>
    </div>
  );
}

export default Sprint;
