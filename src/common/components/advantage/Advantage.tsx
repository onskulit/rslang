import React from 'react';
import classNames from 'classnames';
import { Button, Col, Row, Image, Typography, Space, Card } from 'antd';

import styles from './Advantage.module.css';

const { Title, Text } = Typography;

interface IAdvantageProps {
  title: string;
  text: string;
  image?: string;
  classList?: string[];
}

function Advantage({ title, text, image, classList }: IAdvantageProps) {
  return (
    <Card.Grid
      className={`${styles.card} ${
        classList
          ? classNames(
              classList?.map((cn) => {
                return styles[cn];
              })
            )
          : ''
      }`}
    >
      <Image src={image} preview={false} rootClassName={styles.image} />
      <Title level={3} className={styles.title}>
        {title}
      </Title>
      <Text className={styles.text}>{text}</Text>
    </Card.Grid>
  );
}

export default Advantage;
