import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeValidation } from '../../../features/user/userSlice';
import { storage } from '../../../common/utils/localStorage';
import { STORAGE_KEY } from '../../../common/constants/localStorage';
import { Dropdown, Menu, Space, Grid, Button } from 'antd';
import styles from './Nav.module.css';
import { useMemo } from 'react';
import gamesInfo from '../../../common/constants/gamesInfo';
import MobileMenu from '../../../common/components/mobileMenu/MobileMenu';
const { useBreakpoint } = Grid;

function Nav() {
  const { validate } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogIn = () => {
    dispatch(changeValidation(false));
    storage.remove(STORAGE_KEY.userAuthData);
    storage.remove(STORAGE_KEY.userLogInData);
  };

  const dropdownMenuClickHandler = useMemo(
    () => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      event.preventDefault(),
    []
  );
  const menu = useMemo(
    () => (
      <Menu
        items={Object.values(gamesInfo).map((game, index) => ({
          label: <NavLink to={game.pathWithMenu}>{game.name}</NavLink>,
          key: index,
        }))}
      />
    ),
    []
  );
  const screens = useBreakpoint();

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} ${!screens.md && styles.hidden}`}>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/books">Учебник</NavLink>
        <Dropdown overlay={menu}>
          <a onClick={dropdownMenuClickHandler}>
            <Space>
              Игры
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <NavLink to="/statistics">Статистика</NavLink>
        {validate ? (
          <Button onClick={handleLogIn} className={styles.button}>
            Выход
          </Button>
        ) : (
          <Button className={styles.button}>
            <NavLink to="/authorization">Вход</NavLink>
          </Button>
        )}
      </div>
      <MobileMenu />
    </nav>
  );
}

export default Nav;
