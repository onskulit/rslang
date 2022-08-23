import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Radio, Row, RadioChangeEvent, Space } from 'antd';

import styles from './AuditionOptions.module.css';
import { IWordWithAnswer } from '../../common/types/interfaces';

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

  useEffect(() => {
    if (help) {
      setIsAnswered(true);
      setAnswer(correctOption);
    }
  }, [help]);

  useLayoutEffect(() => {
    setIsAnswered(false);
  }, [options]);

  return (
    <Radio.Group
      size="large"
      disabled={isAnswered}
      onChange={(e: RadioChangeEvent) => {
        let option = options.find((option) => option.word === e.target.value);
        if (option) {
          if (option.word === correctOption?.word) {
            option = { ...option, correct: true };
            setCurrentAnswer(option);
          } else {
            setCurrentAnswer(option);
          }
        }
        setAnswer(option);
        setIsAnswered(true);
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
