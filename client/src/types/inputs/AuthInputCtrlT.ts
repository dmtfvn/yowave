export type AuthInputCtrlT = {
  label: string;
  hint: string;
  error: string;
  inputValue: string;
  onTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
