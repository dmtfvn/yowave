import { createContext } from 'react';

import { FriendsContextT } from '../../types/friend/FriendsContextT';

export const FriendsContext = createContext<FriendsContextT>({
  friendList: [],
  setFriendList: () => {},
  friendId: '',
  setFriendId: () => {}
});
