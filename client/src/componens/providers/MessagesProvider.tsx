import { useState } from 'react';

import { ChildrenT } from '../../types/children/ChildrenT';

import { MessagesContext } from '../contexts/MessagesContext';

import { DirectMsgT } from '../../types/friend/DirectMsgT';

export default function MessagesProvider({ children }: ChildrenT) {
  const [messages, setMessages] = useState<DirectMsgT[]>([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
}
