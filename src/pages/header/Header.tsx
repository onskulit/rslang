import Nav from './nav/Nav';
import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

function Header() {
  const { isRunning } = useAppSelector((state: RootState) => state.gameStatus);
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );
  return (
    <>
      {!isRunning && (
        <PageHeader title="RSLang" extra={<Nav />} onBack={handleOnClick} />
      )}
    </>
  );
}

export default Header;
