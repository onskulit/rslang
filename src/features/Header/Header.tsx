import Nav from './nav/Nav';
import { PageHeader } from 'antd';

function _Header() {
  return (
    <PageHeader
      className="site-page-header"
      title="RSLang Team 43" 
      extra={<Nav />}
    />
  );
}

export default _Header;