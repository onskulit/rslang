import React from 'react';
import { Col, Row, Typography, Space } from 'antd';

import { DEVELOPERS } from '../../constants/developers';

import styles from './Developers.module.css';
import Developer from '../developer/Developer';

const { Title } = Typography;

function Developers() {
  return (
    <div className={styles.developers}>
      <Col span={16} offset={4} className={styles.container}>
        <Row>
          <Space direction="vertical" size={'large'} className={styles.wrapper}>
            <Title level={2} className={styles.title}>
              Разработчики
            </Title>
            <div className={styles.list}>
              <Developer
                name={DEVELOPERS.DIMA.name}
                about={DEVELOPERS.DIMA.about}
                photo={DEVELOPERS.DIMA.photo}
                goal={DEVELOPERS.DIMA.goal}
              />
              <Developer
                name={DEVELOPERS.EGOR.name}
                about={DEVELOPERS.EGOR.about}
                photo={DEVELOPERS.EGOR.photo}
                goal={DEVELOPERS.EGOR.goal}
                classList={['cardGreen']}
              />
              <Developer
                name={DEVELOPERS.ANDREY.name}
                about={DEVELOPERS.ANDREY.about}
                photo={DEVELOPERS.ANDREY.photo}
                goal={DEVELOPERS.ANDREY.goal}
                classList={['cardYellow']}
              />
            </div>
          </Space>
        </Row>
      </Col>
    </div>
  );
}

export default Developers;
