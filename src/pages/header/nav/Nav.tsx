import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/">Main Page</NavLink>
      <NavLink to="/textbook">Textbook</NavLink>
      <NavLink to="/sprint">Sprint</NavLink>
      <NavLink to="/audition">Audiocall</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
    </nav>
  );
}

export default Nav;
