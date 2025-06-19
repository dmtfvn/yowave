import { Dispatch, SetStateAction } from 'react';

import { FriendT } from './FriendT';

export interface FriendsContextT {
  friendList: FriendT[];
  setFriendList: Dispatch<SetStateAction<FriendT[]>>;
}
