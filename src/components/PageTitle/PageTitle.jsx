import styles from './PageTitle.module.css';

export default function PageTitle({ text }) {
  return <h1 className={styles.title}>{text}</h1>;
}