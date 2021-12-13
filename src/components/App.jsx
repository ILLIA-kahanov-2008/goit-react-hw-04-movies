import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AppHeader from './AppHeader/AppHeader';
import LoaderComponent from './Loader/LoaderComponent';


const MoviesPage = lazy(
  () => import('../pages/MoviesPage') /*webpackChunkName: MoviesPage*/,
);
const HomePage = lazy(
  () => import('../pages/HomePage') /*webpackChunkName: HomePage*/,
);
const MovieDetailsPage = lazy(
  () =>
    import(
      '../pages/MovieDetailsPage'
    ) /*webpackChunkName: MovieDetailsPage*/,
);
const NotFoundPage = lazy(
  () => import('../pages/NotFoundPage') /*webpackChunkName: NotFoundPage*/,
);

function App() {
  return (
    <>
      <AppHeader />
      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieID" component={MovieDetailsPage} />
          <Route path="/notFound" component={NotFoundPage} />
          <Redirect to="/notFound" />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
