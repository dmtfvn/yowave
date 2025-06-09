import { AuthInputCtrlType } from "../../../types/AuthInputCtrlType";

export default function AuthInputCtrl({
  label,
  hint,
  error,
  inputValue,
  onTyping,
}: AuthInputCtrlType) {
  return (
    <input
      id={label}
      type="text"
      name={label}
      placeholder={hint}
      autoComplete="off"
      value={inputValue}
      onChange={onTyping}
      className={`auth-style ${error ? "outline-red-400" : ''}`.trim()}
    />
  );
}
