import { Row, Spin } from 'antd';

function Loader() {
  return (
    <Row justify="center">
      <Spin tip="Loading..." />
    </Row>
  );
}

export default Loader;
