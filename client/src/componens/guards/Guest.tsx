import { Navigate, Outlet } from 'react-router';

import useUserContext from '../../hooks/useUserContext';

export default function Guest() {
  const { loggedIn } = useUserContext();

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
