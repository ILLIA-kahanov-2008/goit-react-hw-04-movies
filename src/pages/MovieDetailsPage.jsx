import React from 'react';
import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/movies-api';
import MovieMainInfo from '../components/MovieMainInfo/MovieMainInfo';
import MovieAddInfo from '../components/MovieAddInfo/MovieAddInfo';
import GoBackButton from '../components/Buttons/GoBackBtn';
import PageTitle from '../components/PageTitle/PageTitle';

function MovieDetailsPage({ match }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState('');
  const [titleText, setTitleText] = useState('');

  const { movieID } = match.params;

  useEffect(() => {
    getMovieDetails(movieID).then(res => {
      setMovieDetails(res);
      setTitleText(`'${res.title}' details`);
      setGenres(res.genres.map(({ name }) => name).join(', '));
    });
  }, []);

  const { original_title } = movieDetails;

  return (
    <>
      <PageTitle text={titleText}>
        <GoBackButton />
      </PageTitle>
      <MovieMainInfo movieDetails={movieDetails} genres={genres} />
      <MovieAddInfo movieTitle={original_title} />
    </>
  );
}

export default MovieDetailsPage;
