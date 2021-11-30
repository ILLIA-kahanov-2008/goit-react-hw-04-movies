import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { getMovieDetails } from '../../services/movies-api';
import Cast from '../../components/Cast/Cast';
import GoBackButton from '../../components/Buttons/GoBackBtn';
import Reviews from '../../components/Reviews/Reviews';
import default_poster from '../../images/default_poster.jpg';
import s from './MovieDetailsPage.module.css';
import PageTitle from '../../components/PageTitle/PageTitle';

function MovieDetailsPage({ history, match }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState('');
  const [titleText, setTitleText] = useState('');

  const { movieID } = match.params;
  const { location } = history;

  useEffect(() => {
    getMovieDetails(movieID).then(res => {
      setMovieDetails(res);
      setTitleText(`'${res.title}' details`);
      setGenres(res.genres.map(({ name }) => name).join(', '));
    });
  }, []);

  const { original_title, title, vote_average, poster_path, overview } =
    movieDetails;

  let poster = poster_path
    ? `https://image.tmdb.org/t/p/w185/${poster_path}`
    : default_poster;

  return (
    <>
      <PageTitle text={titleText}>
        <GoBackButton />
      </PageTitle>
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
      <section className={s.movieAddInfo}>
        <h2 className={s.movieAddInfoTitle}>
          Additional information about <p>'{original_title}'</p>
        </h2>
        <ul className={s.addInfoList}>
          <li className={s.addInfoItem}>
            <NavLink
              className="navLink"
              activeClassName="activeNavLink"
              to={{
                pathname: match.url + `/cast`,
                state: {
                  from: location.state?.from || '/movies',
                },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink"
              activeClassName="activeNavLink"
              to={{
                pathname: match.url + `/reviews`,
                state: {
                  from: location.state?.from || '/movies',
                },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Route exact path={match.path + '/cast'} component={Cast} />
        <Route path={match.path + '/reviews'} component={Reviews} />
      </section>
    </>
  );
}

export default MovieDetailsPage;
