import React from 'react';
import PropTypes from 'prop-types';
import GalleryItem from '../GalleryItem/GalleryItem';
import default_backdrop from '../../images/default_backdrop.jpg';
import { useLocation } from 'react-router-dom';
import s from './GalleryList.module.css'

GalleryList.propTypes = {
  movies: PropTypes.array.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageTitleText: PropTypes.string,
};

function GalleryList({movies, totalPages, pageTitleText}) {
 
 const location = useLocation();

  const setLocationState = () => {    
    location.state = {
      movies,
      pageScrollHeight: document.documentElement.scrollTop,
      totalPages,
      pageTitleText,
    };
  };

  return (    
      <ul className={s.moviesList} id="moviesList">
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
                    cbOnClick={setLocationState}
                  />
                );
              },
            )}
        </ul>
  );
}

export default GalleryList;



