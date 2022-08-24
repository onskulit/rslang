import { Typography } from 'antd';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const { Title } = Typography;

export function TitleLevel2({ children }: TitleProps) {
  return (
    <Title
      level={2}
      style={{
        fontSize: 32,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Title>
  );
}

export function TitleLevel3({ children }: TitleProps) {
  return (
    <Title
      level={3}
      style={{
        fontSize: 24,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Title>
  );
}
