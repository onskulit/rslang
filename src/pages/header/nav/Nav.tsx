import { DownOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import styles from './Nav.module.css';

function Nav() {
  const menu = (
    <Menu
      items={[
        {
          label: <NavLink to="/sprint">Спринт</NavLink>,
          key: '1',
        },
        {
          label: <NavLink to="/audition">Аудиовызов</NavLink>,
          key: '2',
        },
      ]}
    />
  );

  return (
    <nav className={styles.nav}>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/textbook">Учебник</NavLink>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
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
