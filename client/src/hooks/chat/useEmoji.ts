import { useRef, useState } from 'react';

import { EmojiClickEventT } from '../../types/chat/EmojiClickEventT';

export default function useEmoji() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const pickEmojiHandler = (e: EmojiClickEventT) => {
    const emoji = e.emoji;
    const input = inputRef.current;

    if (input) {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? start;

      const curValue = input.value;

      const before = curValue.slice(0, start);
      const after = curValue.slice(end);

      setInputValue(before + emoji + after);

      input.selectionEnd = start + emoji.length;
      input.selectionStart = input.selectionEnd;

      input.focus();
    }
  }

  return {
    inputValue,
    setInputValue,
    inputRef,
    pickEmojiHandler
  };
}
