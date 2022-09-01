import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu, Space, Grid } from 'antd';
import styles from './Nav.module.css';
import { useMemo } from 'react';
import gamesInfo from '../../../common/constants/gamesInfo';
import MobileMenu from '../../../common/components/mobileMenu/MobileMenu';

const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();

  return (
    <nav className={styles.nav}>
      <div className={`${styles.wrapper} ${!screens.md && styles.hidden}`}>
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
      </div>
      <MobileMenu />
    </nav>
  );
}

export default Nav;
