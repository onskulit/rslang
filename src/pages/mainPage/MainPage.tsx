import { Divider } from 'antd';
import Advantages from '../../common/components/advantages/Advantages';
import Container from '../../common/components/container/Container';
import Developers from '../../common/components/developers/Developers';
import Hero from '../../common/components/hero/Hero';
import styles from './MainPage.module.css';

function MainPage() {
  return (
    <>
      <Hero />
      <Container>
        <Divider className={styles.divider} />
      </Container>
      <Advantages />
      <Container>
        <Divider className={styles.divider} />
      </Container>
      <Developers />
    </>
  );
}

export default MainPage;
