import { Navigation } from '../Navigation/Navigation';
import GoBackButton from '../Buttons/GoBackBtn';
import { useHistory } from 'react-router-dom';
// import Container from '../Container/Container';
import styles from './AppHeader.module.css';
import { useEffect } from 'react/cjs/react.development';

export default function AppHeader() {
  const { push, location } = useHistory();
  // const handleBtnClick = () => {
  //   push(location.state?.from || "/")
  //   console.log('GO_BACK_BUTTON clicked, location.state >> ', location.state)
  // };

  useEffect(() => {
  console.log('APP_HEADER change location.state:>> ', location.state);
},[location.state])

  return (
    
    <header className={styles.header}>
      {/* <GoBackButton cbOnClick={handleBtnClick}/> */}
      <Navigation />
      </header>
    
  );
}