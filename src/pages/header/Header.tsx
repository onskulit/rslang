import Nav from './nav/Nav';
import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

function Header() {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate('/', { replace: true }),
    [navigate]
  );
  return <PageHeader title="RSLang" extra={<Nav />} onBack={handleOnClick} />;
}

export default Header;
