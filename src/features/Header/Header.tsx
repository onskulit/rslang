import Nav from './Nav/Nav';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div>Logo</div>
      <Nav />
    </header>
  );
}

export default Header;