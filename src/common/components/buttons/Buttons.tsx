import { Button } from 'antd';
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export function ButtonRounded({ children, onClick }: ButtonProps) {
  return (
    <Button type="primary" shape="round" size={'large'} onClick={onClick}>
      {children}
    </Button>
  );
}
