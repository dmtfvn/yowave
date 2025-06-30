import { createContext } from 'react';

import { MessagesContextT } from '../../types/messages/MessagesContextT';

export const MessagesContext = createContext<MessagesContextT>({
  messages: [],
  setMessages: () => {},
});
