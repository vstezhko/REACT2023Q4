import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../MainPage';
import { Links } from '../types/enums';
import Layout from './Layout';
import UncontrolledForm from './UncontrolledForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ``,
        element: <MainPage />,
      },
      {
        path: Links.UNCONTROLLED,
        element: <UncontrolledForm />,
      },
      {
        path: `/${Links.REACT_HOOK_FORM}`,
        element: <div>react-hook-form</div>,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
