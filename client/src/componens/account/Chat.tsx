import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import EmojiPicker, { Theme } from 'emoji-picker-react';

import useEmoji from '../../hooks/chat/useEmoji';
import useFriendContext from '../../hooks/contexts/useFriendContext';
import useSocket from '../../hooks/sockets/useSocket';
import useFriendChatSocket from '../../hooks/sockets/useFriendChatSocket';
import useFriendListSocket from '../../hooks/sockets/useFriendListSocket';
import useFriendIdSocket from '../../hooks/sockets/useFriendIdSocket';

import Messages from '../messages/Messages';

import Spinner from '../spinner/Spinner';
import useChat from '../../hooks/chat/useChat';

export default function Chat() {
  const { friendId } = useFriendContext();

  useSocket();
  useFriendChatSocket();

  const { loadingList } = useFriendListSocket();
  const { errorMsg } = useFriendIdSocket();

  const { inputValue, setInputValue, inputRef, pickEmojiHandler } = useEmoji();
  const { messages, openPicker, setOpenPicker, chatHandler } = useChat({ inputValue, setInputValue });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const toggleEmojiPicker = () => {
    setOpenPicker(prev => !prev);

    if (inputRef.current) {
      inputRef.current.focus();
    }
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

      <div className="fixed bottom-34">
        <EmojiPicker
          open={openPicker}
          theme={Theme.DARK}
          width={328}
          onEmojiClick={pickEmojiHandler}
          autoFocusSearch={false}
          lazyLoadEmojis={true}
          className="absolute left-0 right-0 z-20"
        />
      </div>

      <form onSubmit={chatHandler} className="absolute bottom-22 left-0 right-0 flex gap-2">
        <FaceSmileIcon
          onClick={toggleEmojiPicker}
          className="size-10 cursor-pointer"
        />

        <input
          ref={inputRef}
          type="text"
          name="chat"
          value={inputValue}
          onChange={inputChangeHandler}
          placeholder="Type here to start a chat"
          autoComplete="off"
          className="main-input-style"
        />

        <button className="flex-center max-w-[4rem] w-full rounded-md bg-stone-800 py-2.5 cursor-pointer">
          <PaperAirplaneIcon className="size-4" />
        </button>
      </form>
    </section>
  );
}
