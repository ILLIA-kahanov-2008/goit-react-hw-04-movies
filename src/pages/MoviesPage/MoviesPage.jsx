import React from 'react';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { createPortal } from 'react-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import GalleryItem from '../../components/GalleryItem/GalleryItem';
import { searchMovies } from '../../services/movies-api';
// import { useRouteMatch } from 'react-router-dom';
import default_backdrop from '../../images/default_backdrop.jpg';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoaderComponent from '../../components/Loader/Loader';
// import PropTypes from 'prop-types';

// MoviesPage.propTypes = {

// };

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function MoviesPage({ history, match }) {
  const [queryName, setQueryName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState(null);

  const { push, location } = history;

  // console.log('MOVIES_PAGE match :>> ', match);
  // console.log('MOVIES_PAGE location :>> ', location);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    console.log('MOVIES_PAGE didMount searchQuery :>> ', searchQuery);
    setQueryName(searchQuery);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!queryName) {
      setErrorMessage('Enter new query to search');
      return;
    }
    console.log('MOVIES_PAGE component to new render', pageNumber);
    console.log('MOVIES_PAGE component to new render', queryName);
    setStatus(Status.PENDING);
    searchMovies(pageNumber, queryName)
      .then((response) => {
        console.log(response);
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setStatus(Status.RESOLVED);
        setPageNumber(pageNumber + 1);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
    // eslint-disable-next-line
  }, [queryName]);

  const fetchMovies = () => {
    setStatus(Status.PENDING);
    searchMovies(pageNumber, queryName)
      .then(({results}) => {
        setMovies([...movies, ...results]);
        setStatus(Status.RESOLVED);
        location.search = `query=${queryName}&page=${pageNumber}`;
        setPageNumber(pageNumber + 1);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
  };

  const onFormSubmit = (queryName, pageNumber) => {
    console.log('MOVIES_PAGE submit :>> ', queryName);
    location.search = `query=${queryName}&page=${pageNumber}`;
    setQueryName(queryName);
    setPageNumber(pageNumber);
  };

  const getLocation = pathname => ({
    state: {
      from: location,
    },
    pathname,
  });

  const openMovieDetailsPage = ID => {
    location.hash = ID;
    push(getLocation('/movies/' + ID))
  };

  
  if (status === Status.IDLE) {
    return(
    <>
       <SearchForm onSubmit={onFormSubmit} />
      <h1>Please, Enter your query!!!</h1>
    </>)
  }
  
  if (status === Status.RESOLVED || status === Status.PENDING) {
    return (
      <>
        <SearchForm onSubmit={onFormSubmit} />
        {movies.length > 0 &&
          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={fetchMovies}
            hasMore={totalPages > pageNumber}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
          </InfiniteScroll>
        }
      </>)
  }
      
  // {status === Status.PENDING ?)}
// }
  if (status === Status.REJECTED) { return <NotFoundPage message={errorMessage}/>}
  
}

export default MoviesPage;

// below props only if you need pull down functionality
// refreshFunction={this.refresh}
// pullDownToRefresh
// pullDownToRefreshThreshold={50}
// pullDownToRefreshContent={
//   <h3 style={{ textAlign: 'center' }}>
//     &#8595; Pull down to refresh
//   </h3>
// }
// releaseToRefreshContent={
//   <h3 style={{ textAlign: 'center' }}>
//     &#8593; Release to refresh
//   </h3>
// }
