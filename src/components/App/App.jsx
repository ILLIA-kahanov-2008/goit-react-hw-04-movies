import './App.css';
import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { getTrending } from "../../services/movies-api";
import { useState, useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router';
// import Container from '../Container/Container';
import AppHeader from '../AppHeader/AppHeader';
import LoaderComponent from '../Loader/Loader';
// import Modal from '../Modal/Modal';

const MoviesPage = lazy(()=> import('../../pages/MoviesPage/MoviesPage') /*webpackChunkName: MoviesPage*/);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage') /*webpackChunkName: HomePage*/);
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage') /*webpackChunkName: MovieDetailsPage*/);
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage') /*webpackChunkName: NotFoundPage*/);

function App() {
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => setShowModal(!showModal);
  
  return (
    <>
    {/* <Container> */}
      <AppHeader />      
      <Suspense fallback={<LoaderComponent />}>
           <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />          
          <Route path="/movies/:movieID" component={MovieDetailsPage}/>
          <Route path="/notFound" component={NotFoundPage} />
            {/* <NotFoundPage />
          </Route> */}
          {/* <Redirect></Redirect> */}
        </Switch>
       </Suspense>
      {/* {showModal && (
          <Modal
            onClose={toggleModal}
            // altImageName={altImageName}
            // imageURL={modalImageURL}
            // resetAppOptions={resetModalOptionsInState}
          />
        )} */}
      {/* <footer>
        <span className="footer__text">&copy; ILLIA Kahanov GOIT FE-35 Student 2021</span>
      </footer> */}
      {/* </Container> */}
      </>
  );
}

export default App;




// const [currentPage, setCurrentPage] = useState(1);
  // const [fetching, setFetching] = useState(true);
  // const [totalMoviesPages, setTotalMoviesPages] = useState(0);
  // const [moviesListHeight, setMoviesListHeight] = useState(0);
  
 
//   useEffect(() => {
//     // document.documentElement.scrollTop = 0;
//     console.log('App didMount');    
//     document.addEventListener('scroll', scrollHandler);
//     return function () {
//       document.removeEventListener('scroll', scrollHandler)
//     }    
//     // eslint-disable-next-line
//  }, [])
  
//   const scrollHandler = (e) => {
//     console.log('scrolling, fetching is:', fetching);       
//     let differenceHeight = e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight);
//     // console.log('differenceHeight:', differenceHeight);
    
//     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200 && currentPage < totalMoviesPages) {
//       console.log('scroll to bottom < 200 :>> ', differenceHeight);
//       console.log('scrollHandler before setFetching, fetching is:', fetching);  
//       setFetching(true);
//       incrementPageNumber();
//     }
//   }

  // const toggleFetching = (value) => setFetching(value);
  // const incrementPageNumber = () => setCurrentPage(prevPage => prevPage + 1);
  // const getTotalMoviesPages = (totalPages) => setTotalMoviesPages(totalPages);
  // const setListOffsetHeight = () => setMoviesListHeight(document.querySelector('.moviesList').offsetHeight);


  // render={(routerProps) => (
            //    <HomePage
            //    {...routerProps}
            //   pageNumber={currentPage}
            //   incrementPageNumber={incrementPageNumber}
            //   toggleFetching={toggleFetching}
            //   fetching={fetching}
            //   // totalPages={totalMoviesPages}
            //     setTotalPages={getTotalMoviesPages}
            //     // setListOffsetHeight={setListOffsetHeight}
            // />
            // )}