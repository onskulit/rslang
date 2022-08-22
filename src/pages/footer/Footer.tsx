import React from 'react';
import schoolLogo from '../../assets/svg/school-logo.svg';
import { Typography } from 'antd';
import { GithubOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Footer } from 'antd/lib/layout/layout';
import styles from './Footer.module.css';
const { Title } = Typography;

const AppFooter = () => {
  return (
    <Footer className={styles.footer}>
      <div className={styles.infoLinks}>
        <a
          className={styles.linkLogo}
          href="https://rs.school/js/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className={styles.shoolLogo}
            src={schoolLogo}
            alt="school icon"
          />
        </a>
        <a
          className={styles.infoLink}
          href="https://github.com/onskulit/rslang"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GithubOutlined />
        </a>
        <a
          className={styles.infoLink}
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          <YoutubeOutlined />
        </a>
      </div>
      <div className={styles.developers}>
        <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
          Developers:
        </Title>
        <div className={styles.developersLinks}>
          <a
            className={styles.developersLink}
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            andrey
          </a>
          <a
            className={styles.developersLink}
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            dima
          </a>
          <a
            className={styles.developersLink}
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            egor
          </a>
        </div>
      </div>
      <div>
        <p className={styles.creationYear}>2022</p>
      </div>
    </Footer>
  );
};

export default AppFooter;
