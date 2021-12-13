import React from 'react';
import PropTypes from 'prop-types';

import default_poster from '../../images/default_poster.jpg';

import s from './MovieMainInfo.module.css'
MovieMainInfo.propTypes = {
  movieDetails: PropTypes.object.isRequired,
  genres: PropTypes.string,
};

function MovieMainInfo({movieDetails, genres}) {
    const { original_title, title, vote_average, poster_path, overview } =  movieDetails;
   let poster = poster_path
    ? `https://image.tmdb.org/t/p/w185/${poster_path}`
    : default_poster;
  return (
    <section className={s.movieMainInfo}>
        <img src={poster} alt={title} />
        <article className={s.content}>
          <h2>{original_title}</h2>
          <p>User score: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genres}</p>
        </article>
      </section>
  );
}

export default MovieMainInfo;