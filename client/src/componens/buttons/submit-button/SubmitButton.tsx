import { SubmitButtonType } from '../../../types/SubmitButtonType';

export default function SubmitButton({
  pending,
  style,
  label,
}: SubmitButtonType) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={style}
    >
      {label}
    </button>
  );
}
