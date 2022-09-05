import { Divider } from 'antd';
import Advantages from '../../common/components/advantages/Advantages';
import Developers from '../../common/components/developers/Developers';
import Hero from '../../common/components/hero/Hero';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <>
      <Hero />
      <div className="container">
        <Divider className={styles.divider} />
      </div>
      <Advantages />
      <div className="container">
        <Divider className={styles.divider} />
      </div>
      <Developers />
    </>
  );
}

export default MainPage;
