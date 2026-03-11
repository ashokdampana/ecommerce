
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  // If not logged in, redirect to login page
  return isAuthenticated 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;