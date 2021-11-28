import styles from './PageTitle.module.css';
// import { useHistory } from "react-router-dom";

export default function PageTitle({ text }) {
  // const { push, location } = useHistory();
  // console.log('PAGE_TITLE component location STATE:', location.state);

  return <h1 className={styles.title}>{text}</h1>;
}