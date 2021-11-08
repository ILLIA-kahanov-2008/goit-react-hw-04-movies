import React from 'react';
// import PropTypes from 'prop-types';
import { getTrending } from '../../services/movies-api';
import { useState, useEffect } from 'react';
import GalleryItem from '../../components/GalleryItem/GalleryItem';
import PageTitle from '../../components/PageTitle/PageTitle';
import default_backdrop from '../../images/default_backdrop.jpg';

// HomePage.propTypes = {

// };

function HomePage({  
  history,
}) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const { push, location } = history;

  useEffect(() => {
   if (!currentPage) { return };
    console.log('didUpdate HomePage pageNumber :>> ', currentPage);
      getTrending(currentPage)
        .then(response => {
          setMovies([...movies, ...response.results]);
        })
        .catch((error) => console.log(error.message))

    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    console.log('HomePage didMount', document.documentElement);

    getTrending(currentPage)
      .then((response) => {
        setMovies([...response.results]);       
        setTotalPages(response.total_results);
     })
  

    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler)}
    // eslint-disable-next-line
  }, []);

    const scrollHandler = (e) => {
      console.log('scrolling HomePage');

      let differenceHeight = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);      
      if (differenceHeight < 200 && currentPage < totalPages) {
        console.log('differenceHeight < 200:', differenceHeight);      
        setCurrentPage(prevPage => prevPage + 1)
  }
    }

  const getLocation = pathname => ({
    state: {
      from: location,
    },
    pathname,
  });

  const openMovieDetailsPage = movieID =>
    push(getLocation('/movies/' + movieID));
  
  return (
    <>
      <PageTitle text="Trending today" />

      <ul className="moviesList" id="moviesList">
        {movies &&
          movies.map(
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
            }
          )}
      </ul>
    </>
  );
}

export default HomePage;
