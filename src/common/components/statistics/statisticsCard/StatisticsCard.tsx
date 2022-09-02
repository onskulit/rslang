import { Card } from 'antd';
import React from 'react';

interface StatisticsCardProps {
  children: React.ReactNode;
}
function StatisticsCard({ children }: StatisticsCardProps) {
  return <Card.Grid style={{ width: 500 }}>{children}</Card.Grid>;
}

export default StatisticsCard;
