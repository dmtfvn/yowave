import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import useFriendContext from '../../hooks/useFriendContext';
import useMessageContext from '../../hooks/useMessageContext';

import useSocketIO from '../../hooks/useSocketIO';

import Messages from '../messages/Messages';
import MainInput from '../inputs/main-input/MainInput';

export default function Chat() {
  const { friendId } = useFriendContext();
  const { messages } = useMessageContext();

  const { errorMsg } = useSocketIO();

  const chatHandler = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    console.log(data)
  }

  return (
    <section className="flex-center flex-col">
      {!errorMsg && friendId
        ?
        <Messages
          friendId={friendId}
          chatData={messages}
        />
        :
        <h1 className="error-msg">{errorMsg}</h1>
      }

      {!friendId && !errorMsg &&
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
