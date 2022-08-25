import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Radio, Row, RadioChangeEvent, Space } from 'antd';

import styles from './AuditionOptions.module.css';
import { IWord, IWordWithAnswer } from '../../types/interfaces';

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

  function onKeyPressHandler(e: KeyboardEvent) {
    switch (e.key) {
      case '1':
        handleAnswer(options[0]);
        break;
      case '2':
        handleAnswer(options[1]);
        break;
      case '3':
        handleAnswer(options[2]);
        break;
      case '4':
        handleAnswer(options[3]);
        break;
      case '5':
        handleAnswer(options[4]);
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

    document.addEventListener('keydown', onKeyPressHandler);
    return () => {
      document.removeEventListener('keydown', onKeyPressHandler);
    };
  }, [options]);

  return (
    <Radio.Group
      size="large"
      disabled={isAnswered}
      onChange={(e: RadioChangeEvent) => {
        const option = options.find((option) => option.word === e.target.value);

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
                tabIndex={-1}
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
