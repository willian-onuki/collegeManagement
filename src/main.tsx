import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Colleges } from './pages/Colleges';
import { Classrooms } from './pages/Classrooms';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/colleges',
    element: <Colleges />,
  },
  {
    path: '/classrooms',
    element: <Classrooms />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
