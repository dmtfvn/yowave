import { useContext } from 'react';

import { MessagesContext } from '../../componens/contexts/MessagesContext';

export default function useMessageContext() {
  const ctxData = useContext(MessagesContext);

  return ctxData;
}
