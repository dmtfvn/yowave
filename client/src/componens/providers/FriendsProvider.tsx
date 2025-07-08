import { useState } from 'react';

import { FriendsContext } from '../contexts/FriendsContext';

import { ChildrenT } from '../../types/children/ChildrenT';
import { FriendT } from '../../types/friend/FriendT';

export default function FriendsProvider({
  children
}: ChildrenT) {
  const [friendList, setFriendList] = useState<FriendT[]>([]);

  const [friendId, setFriendId] = useState<string>('');

  return (
    <FriendsContext.Provider value={
      {
        friendList,
        setFriendList,
        friendId,
        setFriendId
      }
    }>
      {children}
    </FriendsContext.Provider>
  );
}
