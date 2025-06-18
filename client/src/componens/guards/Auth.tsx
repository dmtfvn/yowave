import { Navigate, Outlet } from 'react-router';

import useUserContext from '../../hooks/useUserContext';

export default function Auth() {
  const { loggedIn } = useUserContext();

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
