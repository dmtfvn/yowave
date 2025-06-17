import { useLogout } from '../../api/authApi';

export default function User() {
  const { logoutHandler } = useLogout();

  return (
    <div className="flex-center flex-col">
      <h1>Home page</h1>

      <button
        onClick={logoutHandler}
        className="bg-stone-800 py-1 px-2 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
