import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../MainPage';
import { Links } from '../types/enums';
import Layout from './Layout';
import UncontrolledForm from './UncontrolledForm';
import ReactHookForm from './ReactHookForm';

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
        element: <ReactHookForm />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
