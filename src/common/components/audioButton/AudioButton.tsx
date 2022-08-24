import React, { useEffect } from 'react';
import { Button } from 'antd';

// import styles from './AudioButton.module.css';
import { BASE_URL } from '../../constants/api';
import { SoundOutlined } from '@ant-design/icons';

interface IAudioButtonProps {
  audioFile: string;
  mute: boolean;
}

function AudioButton({ audioFile, mute }: IAudioButtonProps) {
  const audio = new Audio(`${BASE_URL}/${audioFile}`);

  useEffect(() => {
    if (!mute) {
      audio.play();
    } else {
      console.log(mute);
    }
  }, [audioFile, mute]);

  return (
    <Button shape="round" size="large" onClick={() => audio.play()}>
      <SoundOutlined />
    </Button>
  );
}

export default AudioButton;
