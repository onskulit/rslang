import React from 'react';
import classNames from 'classnames';
import { Image, Typography, Card, Divider } from 'antd';

import styles from './Developer.module.css';

const { Title, Text } = Typography;

interface IDeveloperProps {
  name: string;
  about: string;
  photo: string;
  goal: string;
  classList?: string[];
}

function Developer({ name, about, goal, photo, classList }: IDeveloperProps) {
  return (
    <Card.Grid
      hoverable={false}
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
      <Image src={photo} preview={false} rootClassName={styles.photo} />
      <div className={styles.main}>
        <Title level={3} className={styles.name}>
          {name}
        </Title>
        <Divider className={styles.divider} />
        <Text className={styles.text}>{about}</Text>
        <Divider className={styles.divider} />
        <Text className={styles.text}>
          <span className={styles.goal}>Что сделал: </span> {goal}
        </Text>
      </div>
    </Card.Grid>
  );
}

export default Developer;
