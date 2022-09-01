import React, { useState } from 'react';
import { Button, Divider, Popover, Grid } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.css';

const { useBreakpoint } = Grid;

function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const screens = useBreakpoint();

  const handleVisibleChange = (newVisible: boolean) => {
    setIsVisible(newVisible);
  };

  const mobileLinks = (
    <div className={`${styles.menu}`}>
      <NavLink to="/" className={styles.link}>
        Главная
      </NavLink>
      <Divider className={styles.divider} />
      <NavLink to="/textbook" className={styles.link}>
        Учебник
      </NavLink>
      <Divider className={styles.divider} />
      <NavLink to="/sprint" className={styles.link}>
        Спринт
      </NavLink>
      <Divider className={styles.divider} />
      <NavLink to="/audition" className={styles.link}>
        Аудиовызов
      </NavLink>
      <Divider className={styles.divider} />
      <NavLink to="/statistics" className={styles.link}>
        Статистика
      </NavLink>
    </div>
  );

  return (
    <Popover
      content={mobileLinks}
      trigger="click"
      visible={isVisible}
      onVisibleChange={handleVisibleChange}
      placement="bottomRight"
      className={`${screens.md && styles.hidden}`}
    >
      <Button
        type="ghost"
        className={`${styles.button} ${isVisible && styles.buttonActive}`}
      >
        <div className={styles.buttonLine}></div>
        <div className={styles.buttonLine}></div>
        <div className={styles.buttonLine}></div>
      </Button>
    </Popover>
  );
}

export default MobileMenu;
