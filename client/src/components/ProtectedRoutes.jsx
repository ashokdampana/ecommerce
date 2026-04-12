
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(user && token);

  // If not logged in, redirect to login page
  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;