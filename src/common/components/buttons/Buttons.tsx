import { Button } from 'antd';
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  tabIndex?: number;
  children: React.ReactNode;
}

export function ButtonRounded({ children, onClick, tabIndex }: ButtonProps) {
  return (
    <Button
      type="primary"
      shape="round"
      size={'large'}
      tabIndex={tabIndex}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </Button>
  );
}
