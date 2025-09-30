import { Navigate, Outlet } from 'react-router-dom';
import Loader from './components/ui/ClipLoader';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};