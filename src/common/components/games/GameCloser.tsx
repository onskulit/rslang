import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;
function GameCloser() {
  const navigate = useNavigate();
  const closeConfirm = () => {
    confirm({
      title: 'Вы действительно хотите покинуть игру?',
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Отмена',
      okText: 'Да',
      onOk() {
        navigate('/');
      },
    });
  };
  return (
    <>
      <CloseCircleOutlined
        style={{
          fontSize: 20,
          position: 'absolute',
          right: 40,
          cursor: 'pointer',
        }}
        onClick={closeConfirm}
      />
    </>
  );
}

export default GameCloser;
