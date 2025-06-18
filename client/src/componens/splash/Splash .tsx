import { Link } from 'react-router';

export default function Splash() {
  return (
    <Link
      to="/auth/login"
      className="flex max-w-[15em] h-auto"
    >
      <img src="/logo.png" alt="yowave-logo" />
    </Link>
  );
}
