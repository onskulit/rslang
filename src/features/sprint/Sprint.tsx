import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { sprintSlice } from './sprintSlice';

function Sprint() {
  const { addWord } = sprintSlice.actions;
  const { words } = useAppSelector((state: RootState) => state.sprint);
  const dispatch = useAppDispatch();
  return (
    <div>
      {words}
      <div>
        <button onClick={() => dispatch(addWord('Hello'))}>Верно</button>
        <button>Неверно</button>
      </div>
    </div>
  );
}

export default Sprint;
