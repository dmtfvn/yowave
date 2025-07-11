import { Dispatch, SetStateAction } from 'react';

import { FriendT } from './FriendT';

export type FriendsContextT = {
  friendList: FriendT[];
  setFriendList: Dispatch<SetStateAction<FriendT[]>>;
  friendId: string;
  setFriendId: Dispatch<SetStateAction<string>>;
};
