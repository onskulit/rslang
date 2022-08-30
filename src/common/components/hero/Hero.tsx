import React from 'react';
import { Col, Row, Image, Typography, Space } from 'antd';
import heroImage from '../../../assets/svg/hero.svg';

import styles from './Hero.module.css';

const { Title, Text } = Typography;

function Hero() {
  return (
    <div className={styles.hero}>
      <Col span={16} offset={4} className={styles.container}>
        <Row>
          <Col span={12}>
            <Space
              align="center"
              direction="vertical"
              className={styles.textContainer}
            >
              <Title level={2} className={styles.title}>
                The World is yours with RS&nbsp;Lang
              </Title>
              <Text className={styles.text}>
                RS Lang — это эффективный сервис для увлекательной практики
                английского языка.
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Image
              src={heroImage}
              preview={false}
              rootClassName={styles.image}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default Hero;
