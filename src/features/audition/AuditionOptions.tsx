import React, { useLayoutEffect, useState } from 'react';
import { Button, Radio, Row, RadioChangeEvent, Space } from 'antd';

import styles from './AuditionOptions.module.css';
import { IWord, IWordWithAnswer } from '../../common/types/interfaces';

interface IOptionsProps {
  options: IWordWithAnswer[];
  correctOption: IWordWithAnswer | null;
  setAnswer: CallableFunction;
}

function AuditionOptions({
  options,
  setAnswer,
  correctOption,
}: IOptionsProps): JSX.Element {
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [currentAnswer, setCurrentAnswer] = useState<IWordWithAnswer | null>(
    null
  );

  useLayoutEffect(() => {
    setIsAnswered(false);
    console.log(options);
  }, [options]);

  return (
    <Radio.Group
      size="large"
      disabled={isAnswered}
      onChange={(e: RadioChangeEvent) => {
        let option = options.find((option) => option.word === e.target.value);
        if (option) {
          console.log(option.word === correctOption?.word);
          if (option.word === correctOption?.word) {
            option = { ...option, correct: true };
            setCurrentAnswer(option);
          }
        }
        console.log('answer is: ', option);
        setAnswer(option);
        setIsAnswered(true);
      }}
    >
      <Space>
        <>{currentAnswer?.word}</>
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
    </Radio.Group>
  );
}

export default AuditionOptions;
