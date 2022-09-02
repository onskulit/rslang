import { Card } from 'antd';
import React from 'react';
import styles from './StatisticsCard.module.css';

interface StatisticsCardProps {
  children: React.ReactNode;
}
function StatisticsCard({ children }: StatisticsCardProps) {
  return (
    <Card.Grid className={styles.card} style={{ width: 500 }}>
      {children}
    </Card.Grid>
  );
}

export default StatisticsCard;
