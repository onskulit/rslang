import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Radio, Row, RadioChangeEvent, Space } from 'antd';

import styles from './AuditionOptions.module.css';
import { IWord, IWordWithAnswer } from '../../types/interfaces';
import { Keyboard, Options } from '../../types/enums';
import { DISABLED_TABINDEX } from '../../constants/numbers';

interface IOptionsProps {
  options: IWordWithAnswer[];
  correctOption: IWordWithAnswer | null;
  setAnswer: CallableFunction;
  help: boolean;
}

function AuditionOptions({
  options,
  correctOption,
  setAnswer,
  help,
}: IOptionsProps): JSX.Element {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<IWordWithAnswer | null>(
    null
  );

  function addCorrectFlag(option: IWordWithAnswer) {
    const answerWithFlag = { ...correctOption };
    if (option.word === correctOption?.word) {
      answerWithFlag.correct = true;
    } else {
      answerWithFlag.correct = false;
    }
    return answerWithFlag;
  }

  function handleAnswer(option: IWord) {
    setCurrentAnswer(option);
    setAnswer(addCorrectFlag(option));
    setIsAnswered(true);
  }

  function onKeyPressHandler(event: KeyboardEvent) {
    switch (event.key) {
      case Keyboard.KEY_1:
        handleAnswer(options[Options.OPTION_1]);
        break;
      case Keyboard.KEY_2:
        handleAnswer(options[Options.OPTION_2]);
        break;
      case Keyboard.KEY_3:
        handleAnswer(options[Options.OPTION_3]);
        break;
      case Keyboard.KEY_4:
        handleAnswer(options[Options.OPTION_4]);
        break;
      case Keyboard.KEY_5:
        handleAnswer(options[Options.OPTION_5]);
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    if (help) {
      setIsAnswered(true);
      setAnswer(correctOption);
    }
  }, [help]);

  useLayoutEffect(() => {
    setIsAnswered(false);

    document.addEventListener('keydown', onKeyPressHandler, {
      once: true,
    });
    return () => {
      document.removeEventListener('keydown', onKeyPressHandler);
    };
  }, [options]);

  return (
    <Radio.Group
      size="large"
      disabled={isAnswered}
      onChange={(event: RadioChangeEvent) => {
        const option = options.find(
          (option) => option.word === event.target.value
        );

        if (option) {
          handleAnswer(option);
        }
      }}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row justify="center">
          <>{currentAnswer?.word}</>
        </Row>
        <Row justify="center">
          <Space>
            {options.map((option) => (
              <Radio.Button
                value={option.word}
                key={option.id}
                tabIndex={DISABLED_TABINDEX}
                className={`${styles.option} ${
                  isAnswered &&
                  correctOption?.word === option?.word &&
                  styles.optionCorrect
                } ${
                  isAnswered &&
                  currentAnswer?.word === option?.word &&
                  styles.optionIncorrect
                }`}
              >
                {option.wordTranslate}
              </Radio.Button>
            ))}
          </Space>
        </Row>
      </Space>
    </Radio.Group>
  );
}

export default AuditionOptions;
