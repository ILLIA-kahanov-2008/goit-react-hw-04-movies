import styles from './PageTitle.module.css';

export default function PageTitle({ text, children }) {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{text}</h1>
      {children}
    </div>
  );
}
