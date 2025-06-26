import { useState } from 'react';

import { FriendsContext } from '../contexts/FriendsContext';

import { ChildrenT } from '../../types/children/ChildrenT';
import { FriendT } from '../../types/friend/FriendT';

export default function FriendsProvider({ children }: ChildrenT) {
  const [friendList, setFriendList] = useState<FriendT[]>([]);

  return (
    <FriendsContext.Provider value={{ friendList, setFriendList }}>
      {children}
    </FriendsContext.Provider>
  );
}
