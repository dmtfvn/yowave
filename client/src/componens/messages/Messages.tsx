import { useEffect, useRef } from 'react';

import useFriendContext from '../../hooks/useFriendContext';

import { MessagesT } from '../../types/messages/MessagesT';

export default function Messages({
  friendId,
  chatData,
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
      <div className="flex items-end p-4">
        <img
          src="/user-icon.png"
          alt="user icon"
          className={`max-w-[2.5em] rounded-full border-2 ${friend?.online ? 'border-green-600' : 'border-red-600'}`}
        />

        <p className="friend-name-style">{friend?.username}</p>
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
