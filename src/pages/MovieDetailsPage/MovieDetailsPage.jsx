import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../services/movies-api';
import Cast from '../../components/Cast/Cast';
import GoBackButton from '../../components/Buttons/GoBackBtn';
import Reviews from '../../components/Reviews/Reviews'
import default_poster from "../../images/default_poster.jpg";
import s from './MovieDetailsPage.module.css'
// import PropTypes from 'prop-types';

// MovieDetailsPage.propTypes = {

// };

function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState('')
  const {movieID} = useParams();
// console.log("MovieDetailsPage movieDetails", movieDetails);
  useEffect(() => {
    getMovieDetails(movieID)
      .then((res) => {
        setMovieDetails(res);
        setGenres(res.genres.map(({ name }) => name).join(', '))
      }) // eslint-disable-next-line     
  }, []);

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
  let poster = poster_path ? `https://image.tmdb.org/t/p/w185/${poster_path}` : default_poster;

  return (
    <>
      <GoBackButton/>
      <section className={s.movieMainInfo}>
        <img
          src={poster}
          alt={title}
        />
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
        <h2 className={s.movieAddInfoTitle}>Additional information about <p>{original_title}</p></h2>
        <ul className={s.addInfoList}>
          <li className={s.addInfoItem}>
            <NavLink className="navLink" activeClassName="activeNavLink" to={`/movies/${movieID}/cast` }>
            Cast
            </NavLink>
          </li>
          <li>
            <NavLink className="navLink" activeClassName="activeNavLink" to={`/movies/${movieID}/reviews` }>
            Reviews
            </NavLink>
          </li>
        </ul>        
      {/* </section>
      <section> */}
        <Route path="/movies/:movieID/cast">
          <Cast />
        </Route>
        <Route path="/movies/:movieID/reviews">
         <Reviews/>
        </Route>
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