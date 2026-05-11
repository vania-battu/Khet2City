import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Or a loading spinner

  if (!token) {
    // Redirect to login but save the current location to come back after login
    return <Navigate to="/?openLogin=true" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
