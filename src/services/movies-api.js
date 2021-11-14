import axios from 'axios';

const API_KEY = '12ae81efe6e825dc1785f3d595e1c6cf';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

// async function fetchWithErrorHandling(url = '', config = {}) {
//   const response = await fetch(url, config);
//   return response.ok
//     ? await response.json()
//     : Promise.reject(new Error('Not found'));
// }

export async function getTrending(pageNumber) {
  let endPoint = `trending/movie/week`;
  let params = `?api_key=${API_KEY}&page=${pageNumber}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movies = result.data
     if (result.status === 400) throw new Error();
      // console.log(movies);
    if (result.status === 200) return movies;
    // console.log(movies);
  } catch (error) {
    // console.log('Error', error);
      return error.message;
  }  
}

export async function searchMovies(pageNumber, searchQuery) {
  let endPoint = `search/movie`;
  let params = `?api_key=${API_KEY}&page=${pageNumber}&query=${searchQuery}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movies = result.data
     if (result.status === 400) throw new Error();
      // console.log(result);
    if (result.status === 200) return movies;
    // console.log(movies);
  } catch (error) {
    // console.log('Error', error);
      return error.message;
  }  
  
  
}

export async function getMovieDetails(movieID) {
  let endPoint = `movie/${movieID}`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetails = result.data
     if (result.status === 400) throw new Error();
      // console.log(movieDetails);
    if (result.status === 200) return movieDetails;
    // console.log(movies);
  } catch (error) {
    // console.log('Error', error);
      return error.message;
  }   
}

export async function getMovieCast(movieID) {
  let endPoint = `movie/${movieID}/credits`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetailsCast = result.data.cast
     if (result.status === 400) throw new Error();
      // console.log(movieDetailsCast);
    if (result.status === 200) return movieDetailsCast;
    // console.log(movies);
  } catch (error) {
    // console.log('Error', error);
      return error.message;
  } 
  // return await axios.get(`movie/${movieID}/credits?api_key=${API_KEY}`)  
}

export async function getMovieReviews(movieID) {
  let endPoint = `movie/${movieID}/reviews`;
  let params = `?api_key=${API_KEY}`;
  let url = endPoint + params;
  try {
    const result = await axios.get(url);
    const movieDetailsReviews = result.data.results;
     if (result.status === 400) throw new Error();
      // console.log(movieDetailsReviews);
    if (result.status === 200) return movieDetailsReviews;
    // console.log(movies);
  } catch (error) {
    // console.log('Error', error);
      return error.message;
  } 
  // return axios.get(`movie/${movieID}/reviews?api_key=${API_KEY}`)  
}


// export const moviesAPI = {
//   getTrending,
//   searchMovies,
//   getMovieDetails,
//   getMovieCredits,
//   getMovieReviews
// }


// const options = [
//   {
//     name: "trending",
//     endPoint: "trending",
//     mediaType: "movie", //['all', 'movie', 'tv', 'person']
//     timeWindow: "week",//['day','week'],    
//   },
//   {
//     name: "search",
//     endPoint: "search/movie",
//     query:'', //required
//     page: 1, //min 1, max 1000
//     language: '',//Pass a ISO 639-1 value to display translated data for the fields that support it.     
//   include_adult: false,//true
// region:'' ,//Specify a ISO 3166-1 code to filter release dates. Must be uppercase.
// year:null,//
// primary_release_year:null//
//   }
// ]

// URL=baseURL+trending/{media_type}/{time_window}?api_key=''





// const BASE_URL = 'http://localhost:4040';

// async function fetchWithErrorHandling(url = '', config = {}) {
//   const response = await fetch(url, config);
//   return response.ok
//     ? await response.json()
//     : Promise.reject(new Error('Not found'));
// }

// export function fetchAuthors() {
//   return fetchWithErrorHandling(`${BASE_URL}/authors?_embed=books`);
// }

// export function fetchBooks() {
//   return fetchWithErrorHandling(`${BASE_URL}/books`);
// }

// export function fetchBookById(bookId) {
//   return fetchWithErrorHandling(`${BASE_URL}/books/${bookId}?_expand=author`);
// }