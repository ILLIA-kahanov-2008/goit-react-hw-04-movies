import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { getMovieCast } from '../../services/movies-api';
import React, { useEffect, useState } from 'react';
import s from './Cast.module.css';
import default_photo from '../../images/default_photo.jpg';
// import PropTypes from 'prop-types';

// Cast.propTypes = {};

function Cast() {
  const [cast, setCast] = useState([]);
  const { movieID } = useParams();
  console.log(movieID);
  useEffect(() => {
    getMovieCast(movieID).then(setCast); // eslint-disable-next-line
  }, []);
  return (
    <>
      {/* <h1>IT's Cast rendering</h1> */}
      <ul className={s.castList}>
        {cast.map(
          ({ cast_id, profile_path, original_name, character, name }) => {
            let actorPhoto = profile_path
              ? `https://image.tmdb.org/t/p/w185/${profile_path}`
              : default_photo;
            return (
              <li key={cast_id} className={s.castItem}>
                <img
                  className={s.actorPhoto}
                  src={actorPhoto}
                  alt={name}
                />
                <h4 className={s.castName}>{original_name}</h4>
                <p>
                  <span className={s.castCharacter}>Character:</span>{' '}
                  {character}
                </p>
              </li>
            );
          },
        )}
      </ul>
    </>
  );
}

export default Cast;


// import { useState, useEffect, lazy, Suspense } from 'react';
// import { NavLink, Route, useRouteMatch } from 'react-router-dom';
// import * as bookShelfAPI from '../services/bookshelf-api';
// import PageHeading from '../components/PageHeading/PageHeading';
// // import AuthorSubView from './AuthorSubView';

// const AuthorSubView = lazy(() =>
//   import('./AuthorSubView.js' /* webpackChunkName: "authors-subview"*/),
// );

// export default function AuthorsView() {
//   const { url, path } = useRouteMatch();
//   const [authors, setAuthors] = useState(null);

//   useEffect(() => {
//     bookShelfAPI.fetchAuthors().then(setAuthors);
//   }, []);

//   return (
//     <>
//       <PageHeading text="Авторы" />

//       {authors && (
//         <ul>
//           {authors.map(author => (
//             <li key={author.id}>
//               <NavLink to={`${url}/${author.id}`}>{author.name}</NavLink>
//             </li>
//           ))}
//         </ul>
//       )}
//       <hr />

//       <Suspense fallback={<h1>Загружаем подмаршрут...</h1>}>
//         <Route path={`${path}/:authorId`}>
//           {authors && <AuthorSubView authors={authors} />}
//         </Route>
//       </Suspense>
//     </>
//   );
// }