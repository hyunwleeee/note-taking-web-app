import { Navigate, Outlet, useLocation } from 'react-router-dom';

import useAuth from '@hooks/useAuth';

export default function ProtectedRouter() {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to='/login' state={{ from: location }} replace={true} />;
  }

  return <Outlet />;
}
