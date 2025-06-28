import { useContext } from 'react';

import { FriendsContext } from '../componens/contexts/FriendsContext';

export default function useFriendContext() {
  const ctxData = useContext(FriendsContext);

  return ctxData;
}
