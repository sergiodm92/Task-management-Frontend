import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

type GuardianProps = {
  children?: React.ReactNode;
};

export const Guardian: React.FC<GuardianProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children
  return <>{children || <Outlet />}</>;
};
