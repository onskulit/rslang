import React, { useEffect } from 'react';
import { Button } from 'antd';

import styles from './AudioButton.module.css';
import { BASE_URL } from '../../constants/api';
import { SoundOutlined } from '@ant-design/icons';
import { Keyboard } from '../../types/enums';

interface IAudioButtonProps {
  audioFile: string;
  mute: boolean;
}

function AudioButton({ audioFile, mute }: IAudioButtonProps) {
  const audio = new Audio(`${BASE_URL}/${audioFile}`);

  function playSound() {
    audio.play();
  }

  function onSpaceHandler(event: KeyboardEvent) {
    if (event.key === Keyboard.SPACE) {
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
    <Button
      tabIndex={0}
      shape="round"
      size="large"
      onClick={playSound}
      className={styles.button}
    >
      <SoundOutlined className={styles.buttonIcon} />
    </Button>
  );
}

export default AudioButton;
