import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import styles from './Nav.module.css';
import { useMemo } from 'react';
import gamesInfo from '../../../common/constants/gamesInfo';

function Nav() {
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
    </nav>
  );
}

export default Nav;
