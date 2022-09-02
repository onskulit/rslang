import React, { useMemo, useState } from 'react';
import { Button, Divider, Popover, Grid } from 'antd';
import { NavLink } from 'react-router-dom';
import { HEADER_LINKS } from '../../constants/headerLinks';
import styles from './MobileMenu.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { storage } from '../../../utils/localStorage';
import { changeValidation } from '../../../app/reducers/userSlice';
import { STORAGE_KEY } from '../../constants/localStorage';

const { useBreakpoint } = Grid;

function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const { validate } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const handleLogIn = () => {
    dispatch(changeValidation(false));
    storage.remove(STORAGE_KEY.userAuthData);
    storage.remove(STORAGE_KEY.userLogInData);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setIsVisible(newVisible);
  };

  const mobileLinks = useMemo(
    () => (
      <>
        {Object.values(HEADER_LINKS).map((link, index) => (
          <div className={styles.menuItem} key={index}>
            <NavLink
              to={link.path}
              className={styles.link}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              {link.name}
            </NavLink>
            <Divider className={styles.divider} />
          </div>
        ))}
        {validate ? (
          <a
            onClick={() => {
              setIsVisible(false);
              handleLogIn();
            }}
            className={styles.link}
          >
            Выход
          </a>
        ) : (
          <NavLink
            to="/authorization"
            className={styles.link}
            onClick={() => {
              setIsVisible(false);
            }}
          >
            Вход
          </NavLink>
        )}
      </>
    ),
    [validate]
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
