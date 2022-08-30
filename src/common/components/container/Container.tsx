import { Row } from 'antd';
import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <Row className={styles.container}>{children}</Row>;
}

export default Container;
