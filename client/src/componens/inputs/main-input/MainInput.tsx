export default function MainInput({
  label,
  hint,
}: Record<string, string>) {
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
