import axios from 'axios';

const API_KEY = '12ae81efe6e825dc1785f3d595e1c6cf';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function getTrending(pageNumber) {
  let endPoint = `trending/movie/week`;
  let params = `?api_key=${API_KEY}&page=${pageNumber}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movies = result.data;
    if (result.status === 400) throw new Error();
    if (result.status === 200) return movies;
  } catch (error) {
    return error.status_message;
  }
}

export async function searchMovies(pageNumber, searchQuery) {
  let endPoint = `search/movie`;
  let params = `?api_key=${API_KEY}&page=${pageNumber}&query=${searchQuery}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movies = result.data;
    if (result.status === 400) throw new Error();
    if (result.status === 200) return movies;
  } catch (error) {
    return error.status_message;
  }
}

export async function getMovieDetails(movieID) {
  let endPoint = `movie/${movieID}`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetails = result.data;
    if (result.status === 400) throw new Error();
    if (result.status === 200) return movieDetails;
  } catch (error) {
    return error.status_message;
  }
}

export async function getMovieCast(movieID) {
  let endPoint = `movie/${movieID}/credits`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetailsCast = result.data.cast;
    if (result.status === 400) throw new Error();
    if (result.status === 200) return movieDetailsCast;
  } catch (error) {
    return error.status_message;
  }
}

export async function getMovieReviews(movieID) {
  let endPoint = `movie/${movieID}/reviews`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetailsReviews = result.data.results;
    if (result.status === 400) throw new Error();
    if (result.status === 200) return movieDetailsReviews;
  } catch (error) {
    return error.status_message;
  }
}
