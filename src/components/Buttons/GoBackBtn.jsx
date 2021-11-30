// import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styles from './GoBackBtn.module.css';

function GoBackButton() {
  const { push, location } = useHistory();

  const handleBtnClick = () => push(location.state?.from || '/');

  return (
    <button className={styles.button} type="button" onClick={handleBtnClick}>
      GO BACK
    </button>
  );
}

export default GoBackButton;
