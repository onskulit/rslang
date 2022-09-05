import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { updateGameStatus } from '../../../features/gameStatus/gameStatusSlice';
import styles from './GameCloser.module.css';

const { confirm } = Modal;

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
      <PlusOutlined className={styles.icon} onClick={closeConfirm} />
    </>
  );
}

export default GameCloser;
