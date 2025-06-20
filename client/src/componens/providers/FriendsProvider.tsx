import { useState } from 'react';

import { FriendsContext } from '../contexts/FriendsContext';

import { ChildrenT } from '../../types/children/ChildrenT';
import { FriendT } from '../../types/friend/FriendT';

export default function FriendsProvider({ children }: ChildrenT) {
  const [friendList, setFriendList] = useState<FriendT[]>([
    {
      username: 'Rick',
      connected: true,
    },
    {
      username: 'John',
      connected: false,
    },
    {
      username: 'Morty',
      connected: true,
    },
  ]);

  return (
    <FriendsContext.Provider value={{ friendList, setFriendList }}>
      {children}
    </FriendsContext.Provider>
  );
}
