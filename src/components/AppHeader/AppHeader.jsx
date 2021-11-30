import { Navigation } from '../Navigation/Navigation';

import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
