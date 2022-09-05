import { Typography, Grid } from 'antd';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const { Title } = Typography;
const { useBreakpoint } = Grid;

export function TitleLevel2({ children }: TitleProps) {
  const screens = useBreakpoint();
  const fontSize = screens.md ? '2.5rem' : '2rem';

  return (
    <Title
      level={2}
      style={{
        fontSize: fontSize,
        textTransform: 'uppercase',
        textAlign: 'center',
      }}
    >
      {children}
    </Title>
  );
}

export function TitleLevel3({ children }: TitleProps) {
  const screens = useBreakpoint();
  const fontSize = screens.md ? '2rem' : '1.5rem';

  return (
    <Title
      level={3}
      style={{
        fontSize: fontSize,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Title>
  );
}

export function TitleLevel4({ children }: TitleProps) {
  const screens = useBreakpoint();
  const fontSize = screens.md ? '1.5rem' : '1rem';

  return (
    <Title
      level={4}
      style={{
        fontSize: fontSize,
      }}
    >
      {children}
    </Title>
  );
}
