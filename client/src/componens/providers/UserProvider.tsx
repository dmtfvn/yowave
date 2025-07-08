import { UserContext } from '../contexts/UserContext';

import useUser from '../../hooks/useUser';
import Spinner from '../spinner/Spinner';

import { ChildrenT } from '../../types/children/ChildrenT';

export default function UserProvider({
  children
}: ChildrenT) {
  const { user, loading, userLogin, userLogout } = useUser();

  if (loading) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider value={{ ...user, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
}
