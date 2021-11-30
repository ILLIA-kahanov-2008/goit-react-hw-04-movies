import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import styles from './GalleryItem.module.css';
GalleryItem.propTypes = {
  movieID: PropTypes.number.isRequired,
  backdrop: PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  rating:PropTypes.number,
  releaseDate: PropTypes.string.isRequired,
  cbOnClick: PropTypes.func.isRequired,
};

function GalleryItem({
  movieID,
  backdrop,
  title,
  rating,
  releaseDate,
  cbOnClick,
}) {
  const handleClick = () => cbOnClick(movieID);
  return (
    <li className={styles.item} onClick={handleClick}>
      <Link to={`/movies/${movieID}`} className={styles.Link}>
        <article className={styles.card}>
          <img className={styles.cardImage} src={backdrop} alt={title} />
          <div className={styles.cardContent}>
            <h2 className={styles.movieName}>{title}</h2>
            <p className={styles.movieRating}> Rating: {rating} </p>
            <p className={styles.movieReleaseDate}>
              Movie released at: {releaseDate}
            </p>
          </div>
        </article>
      </Link>
    </li>
  );
}

export default GalleryItem;
