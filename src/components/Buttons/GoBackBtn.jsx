// import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import styles from './GoBackBtn.module.css'

// Button.propTypes = {
//   handleBtnClick: PropTypes.func.isRequired,
//   btnVisibility: PropTypes.string.isRequired
// };

function GoBackButton() {
  const { push, location } = useHistory();
  // const history = useHistory();
  console.log('GO_BACK_BUTTON component location STATE:', location.state);
  // console.log('GO_BACK_BUTTON component history:', history);
  // const handleGoBack = () => 
  const handleBtnClick = () => {
    push(location.state?.from || "/")
    console.log('location.state >> ', location.state)
  };
  return (
    <button
      className={styles.button}
            type="button"
            onClick={handleBtnClick}
            // style={{visibility: btnVisibility}}
          >
            GO BACK
          </button>
  );
}

export default GoBackButton;