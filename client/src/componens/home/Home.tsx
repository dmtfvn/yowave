import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="flex-center flex-col">
      <h1>Home page</h1>

      <Link to="/auth/logout" className="bg-stone-800 py-1 px-2 cursor-pointer">
        Logout
      </Link>
    </div>
  );
}
