import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { v4 as uuidv4 } from 'uuid';

import useUserContext from '../../hooks/useUserContext';
import useFriendContext from '../../hooks/useFriendContext';
import useMessageContext from '../../hooks/useMessageContext';

import useSocketIO from '../../hooks/useSocketIO';
import socket from '../../lib/socket';

import Messages from '../messages/Messages';
import MainInput from '../inputs/main-input/MainInput';

import Spinner from '../spinner/Spinner';

export default function Chat() {
  const { userData } = useUserContext();
  const { friendId } = useFriendContext();
  const { messages, setMessages } = useMessageContext();

  const { errorMsg, loadingList } = useSocketIO();

  const chatHandler = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    if (!data.chat || !friendId) {
      return;
    }

    const msgData = {
      to: friendId,
      from: userData.userid,
      id: uuidv4(),
      content: data.chat,
    };

    socket.emit('dm', msgData);

    setMessages(curState => [msgData, ...curState]);
  }

  return (
    <section className="relative flex flex-col max-w-[20.5em] w-full">
      {loadingList
        ?
        <Spinner />
        :
        (!friendId
          ?
          <h1 className="text-center text-2xl txt-shadow my-auto">
            Select someone from your contacts to chat with
          </h1>
          :
          (!errorMsg
            ?
            <Messages
              friendId={friendId}
              chatData={messages}
            />
            :
            <h1 className="error-msg text-center my-auto">{errorMsg}</h1>
          )
        )
      }

      <form action={chatHandler} className="absolute bottom-22 left-0 right-0 flex gap-2">
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
