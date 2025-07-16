import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import useUserContext from '../contexts/useUserContext';
import useFriendContext from '../contexts/useFriendContext';
import useMessageContext from '../contexts/useMessageContext';

import socket from '../../lib/socket';

import request from '../../utils/request';
import { baseUrl } from '../../utils/consts';

import { ChatHookPropsT } from '../../types/chat/ChatHookPropsT';

const url = `${baseUrl}/auth`;

export default function useChat({
  inputValue,
  setInputValue
}: ChatHookPropsT) {
  const [openPicker, setOpenPicker] = useState(false);

  const { userData, userLogout } = useUserContext();
  const { friendId } = useFriendContext();
  const { messages, setMessages } = useMessageContext();

  const chatHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || !friendId) {
      return;
    }

    try {
      await request.post(`${url}/refresh`, {});
    } catch {
      userLogout();
      return;
    }

    const msgData = {
      to: friendId,
      from: userData.userid,
      id: uuidv4(),
      content: inputValue.trim()
    };

    socket.emit('dm', msgData);

    setMessages(prev => [msgData, ...prev]);

    setInputValue('');
    setOpenPicker(false);
  }

  return {
    messages,
    openPicker,
    setOpenPicker,
    chatHandler
  };
}
