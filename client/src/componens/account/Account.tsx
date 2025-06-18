import { Link, Outlet } from 'react-router';
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  UsersIcon
} from '@heroicons/react/24/solid';

import { useLogout } from '../../api/authApi';

export default function Account() {
  const { logoutHandler } = useLogout();

  return (
    <section className="flex-center flex-col min-h-screen w-full">
      <div className="flex grow">
        <Outlet />
      </div>

      <nav className="flex justify-center w-full py-2">
        <Link
          to="/account/chat"
          className="icon-wrapper-style"
        >
          <ChatBubbleLeftIcon className="icon-style" />

          <p className="responsive-p-style">
            Chat
          </p>
        </Link>

        <Link
          to="/account/contacts"
          className="icon-wrapper-style"
        >
          <UsersIcon className="icon-style" />

          <p className="responsive-p-style">
            Contacts
          </p>
        </Link>

        <Link
          to="/account/options"
          className="icon-wrapper-style"
        >
          <Cog6ToothIcon className="icon-style" />

          <p className="responsive-p-style">
            Options
          </p>
        </Link>

        <button
          onClick={logoutHandler}
          className="icon-wrapper-style cursor-pointer"
        >
          <ArrowRightStartOnRectangleIcon className="icon-style" />

          <p className="responsive-p-style">
            Logout
          </p>
        </button>
      </nav>
    </section>
  );
}
