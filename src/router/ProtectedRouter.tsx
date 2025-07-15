import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import useAuth from '@hooks/useAuth';
import { useAuthStore } from '@store/authStore';

export default function ProtectedRouter() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const { role } = useAuthStore.getState();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'admin') {
    console.log('role: ', role);
    toast.error('접근 권한이 없습니다.');
    return null;
  }

  return <Outlet />;
}
