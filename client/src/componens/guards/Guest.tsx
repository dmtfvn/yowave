import { Navigate, Outlet } from 'react-router';

import useUserContext from '../../hooks/contexts/useUserContext';

export default function Guest() {
  const { loggedIn } = useUserContext();

  if (loggedIn) {
    return <Navigate to="/account/chat" />;
  }

  return <Outlet />;
}
