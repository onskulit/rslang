import React from 'react';
import classNames from 'classnames';
import { Typography, Card } from 'antd';

import styles from './DifficultyCard.module.css';
import { LanguageLevels, WordsCount } from '../../types/enums';
import { useAppSelector } from '../../../app/hooks';
import { languageLevels } from '../../constants/getEnums';

const { Title, Text } = Typography;

interface IDifficultyCardProps {
  difficulty: LanguageLevels;
}

function DifficultyCard({ difficulty }: IDifficultyCardProps) {
  const { value: currentDifficulty } = useAppSelector(
    (state) => state.difficulty
  );

  const isActive = languageLevels[currentDifficulty] === difficulty;

  return (
    <Card
      hoverable={false}
      className={classNames(styles.card, difficulty, {
        [styles[`difficulty${difficulty}`]]: difficulty === difficulty,
        [styles.isActive]: isActive,
      })}
    >
      <Title level={4} className={styles.title}>
        {difficulty}
      </Title>
      <Text className={styles.text}>{WordsCount[difficulty]}</Text>
    </Card>
  );
}

export default DifficultyCard;
