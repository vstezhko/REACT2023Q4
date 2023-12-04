import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import AppRouter from './components/AppRouter';
import { AppProvider } from './redux/AppProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);
