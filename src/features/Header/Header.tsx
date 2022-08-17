import Nav from './Nav/Nav';
import { PageHeader } from 'antd';

function Header() {
  return <PageHeader title="RSLang Team 43" extra={<Nav />} />;
}

export default Header;
