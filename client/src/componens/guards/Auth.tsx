import { Navigate, Outlet } from 'react-router';

import useUserContext from '../../hooks/contexts/useUserContext';

export default function Auth() {
  const { loggedIn } = useUserContext();

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
