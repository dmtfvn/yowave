import { Dispatch, SetStateAction } from 'react';

import { FriendT } from './FriendT';

export type FriendsContextT = {
  friendList: FriendT['username'][];
  setFriendList: Dispatch<SetStateAction<FriendT['username'][]>>;
};
