import React from 'react';
import { Col, Row, Typography, Space } from 'antd';

import { DEVELOPERS } from '../../constants/developers';

import styles from './Developers.module.css';
import Developer from '../developer/Developer';
import Container from '../container/Container';

const { Title } = Typography;

function Developers() {
  return (
    <div className={styles.developers}>
      <Container>
        <Col className={styles.container}>
          <Row>
            <Space
              direction="vertical"
              size={'large'}
              className={styles.wrapper}
            >
              <Title level={2} className={styles.title}>
                Разработчики
              </Title>
              <div className={styles.list}>
                <Developer
                  name={DEVELOPERS.DIMA.name}
                  about={DEVELOPERS.DIMA.about}
                  photo={DEVELOPERS.DIMA.photo}
                  goal={DEVELOPERS.DIMA.goal}
                  github={DEVELOPERS.DIMA.github}
                />
                <Developer
                  name={DEVELOPERS.EGOR.name}
                  about={DEVELOPERS.EGOR.about}
                  photo={DEVELOPERS.EGOR.photo}
                  goal={DEVELOPERS.EGOR.goal}
                  github={DEVELOPERS.EGOR.github}
                  classList={['cardGreen']}
                />
                <Developer
                  name={DEVELOPERS.ANDREY.name}
                  about={DEVELOPERS.ANDREY.about}
                  photo={DEVELOPERS.ANDREY.photo}
                  goal={DEVELOPERS.ANDREY.goal}
                  github={DEVELOPERS.ANDREY.github}
                  classList={['cardYellow']}
                />
              </div>
            </Space>
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default Developers;
