import React, { useMemo, useState } from 'react';
import { Button, Divider, Popover, Grid } from 'antd';
import { NavLink } from 'react-router-dom';
import { HEADER_LINKS } from '../../constants/headerLinks';
import styles from './MobileMenu.module.css';

const { useBreakpoint } = Grid;

function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const screens = useBreakpoint();

  const handleVisibleChange = (newVisible: boolean) => {
    setIsVisible(newVisible);
  };

  const mobileLinks = useMemo(
    () => (
      <>
        {Object.values(HEADER_LINKS).map((link, index) => (
          <>
            <NavLink
              to={link.path}
              key={index}
              className={styles.link}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              {link.name}
            </NavLink>
            <Divider className={styles.divider} />
          </>
        ))}
      </>
    ),
    []
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
