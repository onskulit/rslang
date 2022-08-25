import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button } from 'antd';
import { changeValidation } from '../../../app/reducers/userSlice';
import { Dropdown, Menu, Space } from 'antd';
import styles from './Nav.module.css';
import { useMemo } from 'react';
import gamesInfo from '../../../common/constants/gamesInfo';

function Nav() {
  const { validate } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogIn = () => {
    dispatch(changeValidation(false));
  };

  const dropdownMenuClickHandler = useMemo(
    () => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      e.preventDefault(),
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

  return (
    <nav className={styles.nav}>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/textbook">Учебник</NavLink>
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
        <Button onClick={handleLogIn}>Выход</Button>
      ) : (
        <Button>
          <NavLink to="/authorization">Вход</NavLink>
        </Button>
      )}
    </nav>
  );
}

export default Nav;
