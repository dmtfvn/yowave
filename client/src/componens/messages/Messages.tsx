import { useEffect, useRef } from 'react';

import useFriendContext from '../../hooks/contexts/useFriendContext';

import EllipsisOptions from '../ellipsis-options/EllipsisOptions';

import { MessagesT } from '../../types/messages/MessagesT';

export default function Messages({
  friendId,
  chatData
}: MessagesT) {
  const divRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, [chatData]);

  const { friendList } = useFriendContext();

  const friend = friendList.find(f => f.id === friendId);

  return (
    <>
      <div className="relative flex items-center justify-between p-4">
        <img
          src="/user-icon.png"
          alt="user icon"
          className="friend-avatar-style"
        />

        <p className={`absolute top-3 left-16 text-[0.8em] ${friend?.online ? 'text-green-600' : 'text-red-600'}`}>
          {friend?.online ? 'online' : 'offline'}
        </p>

        <p className="absolute bottom-4 left-15.5 friend-name-style">
          {friend?.username}
        </p>

        <EllipsisOptions />
      </div>

      <section className="messages-style custom-x-scroll">
        <div ref={divRef} />

        {chatData
          .filter(d => d.to === friendId || d.from === friendId)
          .map(d => (
            <div
              key={d.id}
              className={`flex ${d.from === friendId ? 'mr-auto' : 'ml-auto'}`}
            >
              <p className={`msg-style word-wrap ${d.from === friendId ? 'bg-black/85' : 'bg-black/20'}`}>
                {d.content}
              </p>
            </div>
          ))
        }
      </section>
    </>
  );
}
