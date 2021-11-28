import { Navigation } from '../Navigation/Navigation';
import GoBackButton from '../Buttons/GoBackBtn';
import { useHistory } from 'react-router-dom';
// import Container from '../Container/Container';
import styles from './AppHeader.module.css';
import { useEffect } from 'react/cjs/react.development';

export default function AppHeader() {
  const history = useHistory();
  // const handleBtnClick = () => {
  //   push(location.state?.from || "/")
  //   console.log('GO_BACK_BUTTON clicked, location.state >> ', location.state)
  // };

  console.log('APP_HEADER history :>> ', history);
//   useEffect(() => {
//   console.log('APP_HEADER change location.state:>> ', history.location.state);
// },[history.location.state])

  return (
    
    <header className={styles.header}>
      {/* <GoBackButton cbOnClick={handleBtnClick}/> */}
      <Navigation />
      </header>
    
  );
}