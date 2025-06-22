import { MainInputT } from '../../../types/inputs/MainInputT';

export default function MainInput({
  label,
  hint,
}: MainInputT) {
  return (
    <input
      type="text"
      name={label}
      placeholder={hint}
      autoComplete="off"
      className="main-input-style"
    />
  );
}
