import React from 'react';
import Main from './pages/Main';
import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="background">
      <ErrorBoundary
        fallback={<p className="fallback">Something went wrong</p>}
      >
        <Routes>
          <Route path={'/'} element={<Main />}>
            <Route path={'details/:id'} element={<Details />} />
          </Route>
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
