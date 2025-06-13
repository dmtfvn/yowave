import { SubmitButtonT } from '../../../interfaces/buttons/SubmitButtonT';

export default function SubmitButton({
  pending,
  style,
  label,
}: SubmitButtonT) {
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
