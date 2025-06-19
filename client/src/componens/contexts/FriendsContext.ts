import { createContext } from 'react';

import { FriendsContextT } from '../../interfaces/friend/FriendsContextT';

export const FriendsContext = createContext<FriendsContextT>({
  friendList: [],
  setFriendList: () => null,
});
