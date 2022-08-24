import React from 'react';
import { Typography } from 'antd';
// import styles from './GameOverMessage.module.css';

const { Text } = Typography;

function GameOverMessage() {
  return (
    <Text
      style={{
        fontSize: 32,
      }}
    >
      В этот раз не получилось, но продолжай тренироваться!
    </Text>
  );
}

export default GameOverMessage;
