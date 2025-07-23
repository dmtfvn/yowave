import { useState } from 'react';
import { useNavigate } from 'react-router';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

import useFriendContext from '../../hooks/contexts/useFriendContext';
import socket from '../../lib/socket';

export default function EllipsisOptions() {
  const [ellipsisToggle, setEllipsisToggle] = useState(false);
  const navigate = useNavigate();

  const { friendId, setFriendId } = useFriendContext();

  const blockContactHandler = () => {
    console.log('Blocked')

    setEllipsisToggle(false);
  }

  const deleteContactHandler = () => {
    socket.emit('rmFriend', friendId);

    setFriendId('');

    navigate('/account/contacts');
  }

  return (
    <>
      <button
        onClick={() => setEllipsisToggle(prev => !prev)}
        className="rounded-full hover:bg-black/15 cursor-pointer"
      >
        <EllipsisVerticalIcon className="size-8" />
      </button>

      <section className={ellipsisToggle ? "ellipsis-wrapper-style" : "hidden"}>
        <button
          onClick={blockContactHandler}
          className="ellipsis-button-style text-amber-100"
        >
          Block
        </button>

        <button
          onClick={deleteContactHandler}
          className="ellipsis-button-style text-red-400"
        >
          Delete
        </button>
      </section>
    </>
  );
}
