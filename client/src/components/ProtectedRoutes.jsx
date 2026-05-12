import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.accessToken);

  const isUser = useAuthStore((state) => state.isUser());

  return isUser
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
