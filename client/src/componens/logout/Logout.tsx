import { Navigate } from 'react-router';

import { useLogout } from '../../api/authApi';

export default function Logout() {
  const { loggedIn } = useLogout();

  return !loggedIn && <Navigate to="/auth/login" />;
}
