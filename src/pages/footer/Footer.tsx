import React from 'react';
import { Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';
import styles from './Footer.module.css';
import Container from '../../common/components/container/Container';
import RSIcon from '../../common/components/rs-icon/rs-icon';
const { Title } = Typography;

const AppFooter = () => {
  return (
    <Footer className={styles.footer}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.infoLinks}>
            <a
              className={styles.linkLogo}
              href="https://rs.school/js/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <RSIcon className={styles.infoLink} />
            </a>
            <a
              className={styles.infoLink}
              href="https://github.com/onskulit/rslang"
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubOutlined />
            </a>
          </div>
          <div className={styles.developers}>
            <Title level={4} className={styles.developersTitle}>
              Разработчики:
            </Title>
            <div className={styles.developersLinks}>
              <a
                className={styles.developersLink}
                href="https://github.com/Trouble-Andrew"
                rel="noopener noreferrer"
                target="_blank"
              >
                Андрей
              </a>
              <a
                className={styles.developersLink}
                href="https://github.com/onskulit"
                rel="noopener noreferrer"
                target="_blank"
              >
                Дима
              </a>
              <a
                className={styles.developersLink}
                href="https://github.com/Egor-Dubovik"
                rel="noopener noreferrer"
                target="_blank"
              >
                Егор
              </a>
            </div>
          </div>
          <div>
            <p className={styles.creationYear}>2022</p>
          </div>
        </div>
      </Container>
    </Footer>
  );
};

export default AppFooter;
