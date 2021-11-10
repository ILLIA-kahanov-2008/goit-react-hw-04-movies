import { Navigation } from '../Navigation/Navigation';
import GoBackButton from '../Buttons/GoBackBtn';
// import Container from '../Container/Container';
import styles from './AppHeader.module.css';

export default function AppHeader () {
  return (
    
    <header className={styles.header}>
      <GoBackButton />
      <Navigation />
      </header>
    
  );
}