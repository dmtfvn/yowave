import { useContext } from 'react';

import { UserContext } from '../componens/contexts/UserContext';

export default function useUserContext() {
  const ctxData = useContext(UserContext);

  return ctxData;
}