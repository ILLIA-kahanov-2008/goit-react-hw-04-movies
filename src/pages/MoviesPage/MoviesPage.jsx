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
import PageTitle from '../../components/PageTitle/PageTitle';
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
  const [titleText, setTitleText] = useState('');
  const [pageScrollHeight, setPageScrollHeight] = useState(0);
  const [loaderTitle, setLoaderTitle] = useState('');

  const { push, location } = history;

  // console.log('MOVIES_PAGE match :>> ', match);
  // console.log('MOVIES_PAGE location :>> ', location.state);

  useEffect(() => {
    // const searchQuery = new URLSearchParams(location.search).get('query');
    // const lastSearchedPage = new URLSearchParams(location.search).get('page');
    // console.log('MOVIES_PAGE DidMount moviesArray :>> ', movies);
    // console.log('MOVIES_PAGE DidMount pageScrollHeight :>> ', pageScrollHeight);
    if (location.search!=="") {
      setQueryName(new URLSearchParams(location.search).get('query'));
      setPageNumber(Number(new URLSearchParams(location.search).get('page'))+1)
      
    } else {
      setTitleText('Enter your query to search movies!')
    }
    
    // console.log('MOVIES_PAGE didMount searchQuery :>> ', searchQuery);    
    // setPageNumber(Number(lastSearchedPage));
    
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log('MOVIES_PAGE DidUpdate moviesArray :>> ', movies);
    // console.log('MOVIES_PAGE DidUpdate query :>> ', queryName);
    if (!queryName) {
      console.log('MOVIES_PAGE DidUpdate !query, so return :>> ', queryName);
      // setStatus(Status.RESOLVED)
      // setTitleText(`You have searched '${queryName}'last time. Enter a new query, please.`);

      return;
    }
    // console.log('MOVIES_PAGE component to new render', pageNumber);
    // console.log('MOVIES_PAGE component to new render', queryName);
    setStatus(Status.PENDING);
    if (location.state === null) {    
    setLoaderTitle(`Loading movies with name "${queryName}"`)  
      searchMovies(pageNumber, queryName)
      .then((response) => {
        console.log("MOVIES_PAGE DidUpdate searchMovies response", response);
        setMovies(response.results);
        setTotalPages(response.total_pages);
        setStatus(Status.RESOLVED);
        setTitleText(`We had found ${response.total_results} movies by "${queryName}" `)
        setPageNumber(pageNumber + 1);
        location.search = `query=${queryName}&page=${pageNumber}`;
        // location.search = `query=${queryName}`;
        push('/movies?' + location.search)
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      })
    } else {
      setMovies(location.state.movies);
      setPageScrollHeight(location.state.pageScrollHeight);
      setTotalPages(location.state.totalPages);
      setTitleText(location.state.titleText)
      setStatus(Status.RESOLVED);
      };    
  }, [queryName]);

  useEffect(() => {
    window.scrollTo({
      top: pageScrollHeight,
      behavior: 'smooth',
      })
  },[pageScrollHeight])

  const fetchMovies = () => {
    setStatus(Status.PENDING);
    setLoaderTitle(`Loading ${pageNumber} page`)
    searchMovies(pageNumber, queryName)
      .then(({ results }) => {
        // console.log("MOVIES_PAGE fetchMovies results", results);
        // console.log('MOVIES_PAGE scrollTop in fetchMovies:>> ', document.documentElement.scrollTop);
        setMovies([...movies, ...results]);
        setStatus(Status.RESOLVED);
        location.search = `query=${queryName}&page=${pageNumber}`;
        // location.search = `query=${queryName}`;
        push('/movies?' + location.search)
        setPageNumber(pageNumber + 1);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
  };

  const onFormSubmit = (queryName, pageNumber) => {
    // console.log('MOVIES_PAGE submit :>> ', queryName);
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
    // location.hash = ID;
    push(getLocation('/movies/' + ID))
    // setPageScrollHeight(document.documentElement.scrollTop)
    location.state = {
      movies,
      pageScrollHeight: document.documentElement.scrollTop,
      totalPages,
      titleText
    };
    // location.scrollHeight = document.documentElement.scrollTop;
    console.log('MOVIES_PAGE scrollTop:>> ', document.documentElement.scrollTop);
    // console.log('MOVIES_PAGE moviesList scrollTop:>> ', document.getElementById('moviesList').scrollTop);
    
  };

  
  if (status === Status.IDLE) {
    return(
    <>
       <PageTitle text={titleText} />
        <SearchForm onSubmit={onFormSubmit} />      
    </>)
  }
  
  if (status === Status.RESOLVED || status === Status.PENDING) {
    return (
      <>
        <PageTitle text={titleText} /> 
        <SearchForm onSubmit={onFormSubmit} />
        {movies.length > 0 &&
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
        }
          {status === Status.PENDING &&
            <LoaderComponent title={loaderTitle} />
       
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
