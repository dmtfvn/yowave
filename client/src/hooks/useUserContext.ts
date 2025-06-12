import { useContext } from 'react';

import { UserContext } from '../componens/context/UserContext';

export default function useUserContext() {
  const ctxData = useContext(UserContext);

  return ctxData;
}