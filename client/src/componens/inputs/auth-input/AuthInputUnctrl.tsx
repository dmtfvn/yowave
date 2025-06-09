import { AuthInputUnctrlType } from '../../../types/AuthInputUnctrlType';

export default function AuthInputUnctrl({
  label,
  hint,
  error,
}: AuthInputUnctrlType) {
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
