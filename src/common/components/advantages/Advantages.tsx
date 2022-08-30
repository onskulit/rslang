import React from 'react';
import { Button, Col, Row, Image, Typography, Space, Card } from 'antd';

import styles from './Advantages.module.css';
import Advantage from '../advantage/Advantage';
import dictionaryImage from '../../../assets/svg/dictionary.svg';
import notebookImage from '../../../assets/svg/notebook.svg';
import whiteboardImage from '../../../assets/svg/whiteboard.svg';
import trophyImage from '../../../assets/svg/trophy.svg';

const { Title } = Typography;

function Advantages() {
  return (
    <div className={styles.advantages}>
      <Col span={16} offset={4} className={styles.container}>
        <Row>
          <Col span={24}>
            <Title level={2} className={styles.title}>
              Приемущества
            </Title>
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              <Col span={6}>
                <Advantage
                  image={notebookImage}
                  title={'Учебник'}
                  classList={['cardBlue']}
                  text={
                    'Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.'
                  }
                />
              </Col>
              <Col span={6}>
                <Advantage
                  image={dictionaryImage}
                  title={'Словарь'}
                  text={
                    'Более 3500 тысяч слов для изучения, разбитых на разделы по уровню твоей подготовки с удобной навигацией.'
                  }
                  classList={['cardGreen']}
                />
              </Col>
              <Col span={6}>
                <Advantage
                  image={trophyImage}
                  title={'Игры'}
                  classList={['cardPink']}
                  text={
                    '2 увлекательных игры на развитие запоминания слов, восприятия на слух и письма. Игровая механика доказала свою эффективность для всех возрастов'
                  }
                />
              </Col>
              <Col span={6}>
                <Advantage
                  image={whiteboardImage}
                  title={'Статистика'}
                  classList={['cardYellow']}
                  text={
                    'Отслеживай свой прогресс в индивидуальной статистике, ставь цели и вдохновляйся на и достижение новых результатов каждый день!'
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default Advantages;
