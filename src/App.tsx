import React from 'react';
import Main from './pages/Main';
import ErrorBoundary from './components/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './components/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'details/:id',
        element: <Details />,
      },
    ],
    errorElement: <p className="fallback">Something went wrong</p>,
  },
]);

const App = () => {
  return (
    <div className="background">
      <ErrorBoundary
        fallback={<p className="fallback">Something went wrong</p>}
      >
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
