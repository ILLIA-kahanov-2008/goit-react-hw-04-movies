import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/movies-api';
import Cast from '../../components/Cast/Cast';
import GoBackButton from '../../components/Buttons/GoBackBtn';
import Reviews from '../../components/Reviews/Reviews';
import default_poster from '../../images/default_poster.jpg';
import s from './MovieDetailsPage.module.css';
// import PropTypes from 'prop-types';

// MovieDetailsPage.propTypes = {

// };

function MovieDetailsPage({ history, match }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState('');

  const { movieID } = match.params;
  const { push, location } = history;

  //  const [locationStateFrom, setLocationStateFrom] = useState(location.state?.from);
  // const [MoviesPageLocation, setMoviesPageLocation] = useState(location.state.from)

  
  // console.log('MOVIE_DETAILS_PAGE match :>> ', match);
  // console.log("MovieDetailsPage movieDetails", movieDetails);

  // const MoviesPageLocation = useRef(location.state.from);

  useEffect(() => {
    // setLocation();
  console.log('MOVIE_DETAILS_PAGE didMount, location :>> ', location);
    getMovieDetails(movieID).then(res => {
      setMovieDetails(res);
      setGenres(res.genres.map(({ name }) => name).join(', '));
    });
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   !locationStateFrom && setLocationStateFrom((prev) => prev);
  //   console.log('!locationStateFrom :>> ', !locationStateFrom);
  //   console.log('locationStateFrom :>> ', locationStateFrom);
  // }, [locationStateFrom])

  // const setLocation = () => ({
  //   state: {
  //     from: location.state.from,
  //   },
  //   // pathname,
  // });

  // const backToMoviesPage = () =>
  // push(setLocation());

  // location.state.from = location;
  // location.state = {from: {pathname: "/movies"}}

  const {
    // backdrop_path,
    original_title,
    title,
    vote_average,
    poster_path,
    overview,
    // id,
  } = movieDetails;
  // console.log("MovieDetailsPage",genres);
  // const genresToString = ()=>genres.map(({ name }) => name).join(', ');
  let poster = poster_path
    ? `https://image.tmdb.org/t/p/w185/${poster_path}`
    : default_poster;

 const handleBtnClick = () => {
    push(location.state?.from || "/")
    console.log('GO_BACK_BUTTON clicked, location.state >> ', location.state)
  };
  
  return (
    <>
      <GoBackButton cbOnClick={handleBtnClick}/>
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
                  from: location.state?.from || "/movies"
                },
              }}
              // onClick={setLocation}
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
                  from: location.state?.from || "/movies"
                },
              }}
              
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        {/* </section>
      <section> */}
        <Route path={match.path + '/cast'} component={Cast} />
        {/* <Cast />
        </Route> */}
        <Route path={match.path + '/reviews'}
          component={Reviews}
          // render={routerProps => (
          //   <Reviews
          //     {...routerProps}

          //     // MoviesPageLocation={setLocation}
            // />
          //  )} 
        />
        {/* <Reviews/>
        </Route> */}
      </section>
    </>
  );
}

export default MovieDetailsPage;

// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PageHeading from '../components/PageHeading/PageHeading';
// import * as bookShelfAPI from '../services/bookshelf-api';

// export default function BookDetailsView() {
//   const { bookId } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     bookShelfAPI.fetchBookById(bookId).then(setBook);
//   }, [bookId]);

//   return (
//     <>
//       <PageHeading text={`Книга ${bookId}`} />

//       {book && (
//         <>
//           <img src={book.imgUrl} alt={book.title} />
//           <h2>{book.title}</h2>
//           <p>Автор: {book.author.name}</p>
//           <p>{book.descr}</p>
//         </>
//       )}
//     </>
//   );
// }
