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

  function playSound() {
    audio.play();
  }

  function onSpaceHandler(e: KeyboardEvent) {
    if (e.key === ' ') {
      playSound();
    }
  }

  useEffect(() => {
    if (!mute) {
      playSound();
    }

    document.addEventListener('keydown', onSpaceHandler);
    return () => {
      document.removeEventListener('keydown', onSpaceHandler);
    };
  }, [audioFile, mute]);

  return (
    <Button tabIndex={0} shape="round" size="large" onClick={playSound}>
      <SoundOutlined />
    </Button>
  );
}

export default AudioButton;
