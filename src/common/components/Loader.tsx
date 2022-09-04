import { Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SPIN_COLOR = '#cdccff';
const TEXT_COLOR = '#000';

function Loader() {
  const icon = (
    <LoadingOutlined style={{ fontSize: 32, color: SPIN_COLOR }} spin />
  );

  return (
    <Row justify="center">
      <Spin tip="Loading..." style={{ color: TEXT_COLOR }} indicator={icon} />
    </Row>
  );
}

export default Loader;
