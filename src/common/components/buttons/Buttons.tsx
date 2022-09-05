import { Button } from 'antd';
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  tabIndex?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function ButtonRounded({
  children,
  onClick,
  tabIndex,
  style,
}: ButtonProps) {
  return (
    <Button
      type="primary"
      shape="round"
      size={'large'}
      tabIndex={tabIndex}
      style={{ width: 150, ...style }}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </Button>
  );
}
