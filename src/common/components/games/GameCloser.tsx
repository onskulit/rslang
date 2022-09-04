import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { updateGameStatus } from '../../../features/gameStatus/gameStatusSlice';

const { confirm } = Modal;
const CLOSE_ICON_COLOR = '#5855f2';

function GameCloser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const closeConfirm = () => {
    confirm({
      title: 'Вы действительно хотите покинуть игру?',
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Отмена',
      okText: 'Да',
      onOk() {
        dispatch(updateGameStatus(false));
        navigate('/');
      },
    });
  };
  return (
    <>
      <PlusOutlined
        style={{
          fontSize: 36,
          position: 'fixed',
          top: 40,
          right: 40,
          cursor: 'pointer',
          color: CLOSE_ICON_COLOR,
          transform: 'rotate(45deg)',
        }}
        onClick={closeConfirm}
      />
    </>
  );
}

export default GameCloser;
