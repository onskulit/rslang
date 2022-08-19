import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { apiSlice } from '../api/apiSlice';
import { sprintSlice } from './sprintSlice';
import { DifficultyLevel } from '../../common/types/enums';
import { useEffect } from 'react';

function Sprint() {
  const { data } = apiSlice.useGetWordsQuery({
    group: DifficultyLevel.LEVEL_0,
    page: 0,
  });
  const { createPares } = sprintSlice.actions;
  const { words } = useAppSelector((state: RootState) => state.sprint);
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
      {words.map((word) => (
        <div key={word[0]}>
          {word[0]}, {word[1]}, {word[2].toString()}
        </div>
      ))}
      <div>
        <button>Верно</button>
        <button>Неверно</button>
      </div>
    </div>
  );
}

export default Sprint;
