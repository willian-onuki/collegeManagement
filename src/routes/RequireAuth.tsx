import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export function RequireAuth() {
  const { data } = useAuth();
  const location = useLocation();

  if (!data.token) {
    return (
      <Navigate
        to='/sign-in'
        state={{ from: location }}
      />
    );
  }

  return <Outlet/>
}
