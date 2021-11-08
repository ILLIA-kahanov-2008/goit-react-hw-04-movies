import React from 'react';
import { useState, useEffect } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import GalleryItem from '../../components/GalleryItem/GalleryItem';
import { searchMovies } from '../../services/movies-api';
// import { useRouteMatch } from 'react-router-dom';
import default_backdrop from '../../images/default_backdrop.jpg';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
// import PropTypes from 'prop-types';

// MoviesPage.propTypes = {

// };

function MoviesPage({history}) {
  const [queryName, setQueryName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  // const routeMatch = useRouteMatch();
  // console.log('MoviesPage routeMatch:', routeMatch);
  const { push, location } = history; 

  useEffect(() => {
    if (!queryName || !pageNumber) return;
    searchMovies(pageNumber, queryName).then(setMovies);
    location.search = `query=${queryName}&page=${pageNumber}`;
  }, [pageNumber, queryName]);

  const onFormSubmit = (queryName, pageNumber) => {
    setQueryName(queryName);
    setPageNumber(pageNumber);
  };

  const getLocation = (pathname) => ({
  state: {
      from: location,
    },
    pathname,
})

    const openMovieDetailsPage = (movieID) =>
    push(getLocation("/movies/" + movieID));

  return (
    <>
      <SearchForm onSubmit={onFormSubmit} />
      {movies ? (
        <ul className="moviesList">
          {movies.map(
            ({
              id,
              backdrop_path,
              original_title,
              vote_average,
              release_date,
            }) => {
              let backdrop = backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                : default_backdrop;
              return (
                <GalleryItem
                  key={id}
                  backdrop={backdrop}
                  title={original_title}
                  rating={vote_average}
                  releaseDate={release_date}
                  movieID={id}
                  cbOnClick={openMovieDetailsPage}
                />
              );
            },
          )}
        </ul>
      ) :
      <NotFoundPage />
      }
    </>
  );
}

export default MoviesPage;
