import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import useFriendContext from '../../hooks/useFriendContext';

import Messages from '../messages/Messages';
import MainInput from '../inputs/main-input/MainInput';
import useMessageContext from '../../hooks/useMessageContext';
import useSocketIO from '../../hooks/useSocketIO';
import { useEffect } from 'react';
import socket from '../../lib/socket';

export default function Chat() {
  const { friendId, setFriendId } = useFriendContext();
  const { messages } = useMessageContext();

  useSocketIO();

  const chatHandler = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    console.log(data)
  }

  useEffect(() => {
    socket.on('friendId', (res) => {
      console.log(res)
      setFriendId(res);
    });

    return () => {
      socket.off('friendId');
    };
  }, [setFriendId]);

  return (
    <section className="flex-center flex-col">
      {friendId
        ?
        <Messages
          friendId={friendId}
          chatData={messages}
        />
        :
        <h1>Select someone from your contacts to chat with</h1>
      }


      <form action={chatHandler} className="flex w-full gap-2">
        <MainInput
          label="chat"
          hint="Type here to start a chat"
        />

        <button className="flex justify-center max-w-[4rem] w-full rounded-md bg-stone-800 py-2.5 cursor-pointer">
          <PaperAirplaneIcon className="size-4" />
        </button>
      </form>
    </section>
  );
}
