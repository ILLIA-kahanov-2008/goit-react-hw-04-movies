import { Navigation } from '../Navigation/Navigation';
// import Container from '../Container/Container';
import styles from './AppHeader.module.css';

export default function AppHeader () {
  return (
    
    <header className={styles.header}>
      <Navigation />
      </header>
    
  );
}