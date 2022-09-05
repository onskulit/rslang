import React from 'react';
import { Col, Row, Typography } from 'antd';

import styles from './Advantages.module.css';
import Advantage from '../advantage/Advantage';
import dictionaryImage from '../../../assets/svg/dictionary.svg';
import notebookImage from '../../../assets/svg/notebook.svg';
import whiteboardImage from '../../../assets/svg/whiteboard.svg';
import trophyImage from '../../../assets/svg/trophy.svg';
import Container from '../container/Container';

const { Title } = Typography;

function Advantages() {
  return (
    <div className={styles.advantages}>
      <Container>
        <Col span={24}>
          <Title level={2} className={styles.title}>
            Преимущества
          </Title>
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={24} md={6} className={styles.advantage}>
              <Advantage
                image={notebookImage}
                title={'Учебник'}
                classList={['cardBlue']}
                text={
                  'Более 3000 тысяч слов для изучения английского языка. В сборник вошли самые употребительные слова и выражения, которые могут понадобиться при чтении и переводе текстов различной сложности.'
                }
              />
            </Col>
            <Col span={24} md={6} className={styles.advantage}>
              <Advantage
                image={dictionaryImage}
                title={'Словарь'}
                text={
                  'Добавляйте выученные или сложные слова в словарь, и вам не придется по сто раз повторять одно и то же слово.'
                }
                classList={['cardGreen']}
              />
            </Col>
            <Col span={24} md={6} className={styles.advantage}>
              <Advantage
                image={trophyImage}
                title={'Игры'}
                classList={['cardPink']}
                text={
                  '2 увлекательных игры на развитие запоминания слов, восприятия на слух и письма. Игровая механика доказала свою эффективность для всех возрастов'
                }
              />
            </Col>
            <Col span={24} md={6} className={styles.advantage}>
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
      </Container>
    </div>
  );
}

export default Advantages;
