import React, { useEffect } from 'react';
import { Button } from 'antd';

import styles from './AudioButton.module.css';
import { BASE_URL } from '../../constants/api';
import { SoundOutlined } from '@ant-design/icons';

interface IAudioButtonProps {
  audioFile: string;
}

function AudioButton({ audioFile }: IAudioButtonProps) {
  const audio = new Audio(`${BASE_URL}/${audioFile}`);

  useEffect(() => {
    audio.play();
  }, [audioFile]);

  return (
    <Button shape="round" size="large" onClick={() => audio.play()}>
      <SoundOutlined />
    </Button>
  );
}

export default AudioButton;
