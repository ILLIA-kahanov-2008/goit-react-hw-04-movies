import React from 'react';
import { NavLink, Route,  useRouteMatch, useLocation } from 'react-router-dom';
import { } from 'react-router-dom';

import PropTypes from 'prop-types';

import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';

import s from './MovieAddInfo.module.css'

MovieAddInfo.propTypes = {
  movieTitle: PropTypes.string,
};

function MovieAddInfo({movieTitle}) {
  const match = useRouteMatch();
  const location = useLocation();

  return (
    <section className={s.movieAddInfo}>
        <h2 className={s.movieAddInfoTitle}>
          Additional information about <p>'{movieTitle}'</p>
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
  );
}

export default MovieAddInfo;