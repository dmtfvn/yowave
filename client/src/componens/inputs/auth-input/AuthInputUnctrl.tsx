import { AuthInputUnctrlT } from '../../../interfaces/inputs/AuthInputUnctrlT';

export default function AuthInputUnctrl({
  label,
  hint,
  error,
}: AuthInputUnctrlT) {
  return (
    <input
      id={label}
      type={(label === 'password' || label === 'rePassword') ? "password" : "text"}
      name={label}
      placeholder={hint}
      autoComplete="off"
      className={`auth-style ${error ? "outline-red-400" : ''}`.trim()}
    />
  );
}
