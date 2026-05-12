import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const AdminRoute = () => {
  const role = useAuthStore((state) => state.role);

  const isAdmin = role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      toast.error("Access denied: Admins only");
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/" replace />; // better than /login
  }

  return <Outlet />;
};

export default AdminRoute;