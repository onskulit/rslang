import { Card } from 'antd';
import React from 'react';
import styles from './StatisticsCard.module.css';

interface StatisticsCardProps {
  children: React.ReactNode;
  style: React.CSSProperties;
}
function StatisticsCard({ children, style }: StatisticsCardProps) {
  return (
    <Card.Grid
      className={styles.card}
      style={{ ...style, position: 'relative' }}
    >
      {children}
    </Card.Grid>
  );
}

export default StatisticsCard;
