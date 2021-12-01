import React from 'react';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { searchMovies } from '../services/movies-api';

import default_backdrop from '../images/default_backdrop.jpg';
import NotFoundPage from './NotFoundPage';
import LoaderComponent from '../components/Loader/LoaderComponent';
import PageTitle from '../components/PageTitle/PageTitle';
import SearchForm from '../components/SearchForm/SearchForm';
import GalleryItem from '../components/GalleryItem/GalleryItem';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function MoviesPage({ history }) {
  const [queryName, setQueryName] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [errorMessage, setErrorMessage] = useState(null);
  const [titleText, setTitleText] = useState('');
  const [pageScrollHeight, setPageScrollHeight] = useState(0);
  const [loaderTitle, setLoaderTitle] = useState('');

  const { push, location } = history;

  useEffect(() => {
    if (location.search !== '') {
      setQueryName(new URLSearchParams(location.search).get('query'));
      setPageNumber(
        Number(new URLSearchParams(location.search).get('page')) + 1,
      );
    } else {
      setTitleText('Enter your query to search movies!');
    }
  }, []);

  useEffect(() => {
    if (!queryName) return;

    setStatus(Status.PENDING);

    if (location.state === null) {
      setLoaderTitle(`Loading movies with name "${queryName}"`);
      searchMovies(pageNumber, queryName)
        .then(response => {
          if (response.total_results === 0) {
            throw new Error(`we couldn't find any results for "${queryName}"`);
          }
          setMovies(response.results);
          setTotalPages(response.total_pages);
          setStatus(Status.RESOLVED);
          setTitleText(
            `We had found ${response.total_results} movies by "${queryName}" `,
          );
          setPageNumber(pageNumber + 1);
          location.search = `query=${queryName}&page=${pageNumber}`;
          push('/movies?' + location.search);
        })
        .catch(error => {
          setStatus(Status.REJECTED);
          setErrorMessage(error.message);
        });
    } else {
      setMovies(location.state.movies);
      setPageScrollHeight(location.state.pageScrollHeight);
      setTotalPages(location.state.totalPages);
      setTitleText(location.state.titleText);
      setStatus(Status.RESOLVED);
    }
  }, [queryName]);

  useEffect(() => {
    window.scrollTo({
      top: pageScrollHeight,
      behavior: 'smooth',
    });
  }, [pageScrollHeight]);

  const fetchMovies = () => {
    setStatus(Status.PENDING);
    setLoaderTitle(`Loading ${pageNumber} page`);
    searchMovies(pageNumber, queryName)
      .then(({ results }) => {
        setMovies([...movies, ...results]);
        setStatus(Status.RESOLVED);
        location.search = `query=${queryName}&page=${pageNumber}`;
        push('/movies?' + location.search);
        setPageNumber(pageNumber + 1);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
  };

  const onFormSubmit = (queryName, pageNumber) => {
    location.search = `query=${queryName}&page=${pageNumber}`;
    location.state = null;
    setQueryName(queryName);
    setPageNumber(pageNumber);
    setTotalPages(0);
    setPageScrollHeight(0);
    setMovies([]);
  };

  const getLocation = pathname => ({
    state: {
      from: location,
    },
    pathname,
  });

  const openMovieDetailsPage = ID => {
    push(getLocation('/movies/' + ID));
    location.state = {
      movies,
      pageScrollHeight: document.documentElement.scrollTop,
      totalPages,
      titleText,
    };
  };

  if (status === Status.IDLE) {
    return (
      <>
        <PageTitle text={titleText}>
          <SearchForm onSubmit={onFormSubmit} />
        </PageTitle>
      </>
    );
  }

  if (status === Status.RESOLVED || status === Status.PENDING) {
    return (
      <>
        <PageTitle text={titleText}>
          <SearchForm onSubmit={onFormSubmit} />
        </PageTitle>
        
        {movies.length > 0 && (
          <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={fetchMovies}
            hasMore={totalPages >= pageNumber}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <ul className="moviesList" id="moviesList">
              {movies.map(
                ({
                  id,
                  backdrop_path,
                  original_title,
                  vote_average,
                  release_date,
                }) => {
                  let backdrop = backdrop_path
                    ? `https://image.tmdb.org/t/p/w780/${backdrop_path}`
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
        )}
        {status === Status.PENDING && <LoaderComponent title={loaderTitle} />}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return <NotFoundPage message={errorMessage} />;
  }
}

export default MoviesPage;
