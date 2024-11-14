import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return(
      <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    ) 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
