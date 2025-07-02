import { useNavigate } from 'react-router';

import useFriendContext from '../../hooks/useFriendContext';
import socket from '../../lib/socket';

import { FriendT } from '../../types/friend/FriendT';

export default function Friend({
  id,
  username,
  online,
}: FriendT) {
  const navigate = useNavigate();

  const { setFriendId } = useFriendContext();

  const chatHandler = () => {
    socket.emit('friendId', id, (res) => {
      setFriendId(res);
    });

    navigate('/account/chat');
  }

  return (
    <button
      onClick={chatHandler}
      className="flex items-center hover:bg-black/15 cursor-pointer p-2"
    >
      <img
        src="/user-icon.png"
        alt="user icon"
        className={`friend-avatar-style border-2 ${online ? 'border-green-600' : 'border-red-600'}`}
      />

      <p className="friend-name-style ml-2">{username}</p>
    </button>
  );
}
