import { Link, Outlet, useLocation } from 'react-router';
import {
  ArrowRightStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

import FriendsProvider from '../providers/FriendsProvider';

import useSocketIO from '../../hooks/useSocketIO';
import { useLogout } from '../../api/authApi';

export default function Account() {
  const { pathname } = useLocation();

  const navTab = (currentPath: string) => {
    return (pathname === currentPath) ? 'text-stone-600' : 'text-black/60';
  }

  useSocketIO();

  const { logoutHandler } = useLogout();

  return (
    <FriendsProvider>
      <section className="flex-center flex-col min-h-screen w-full">
        <div className="flex justify-center grow w-full">
          <Outlet />
        </div>

        <nav className="flex justify-center fixed bottom-0 right-0 left-0 bg-stone-900 border-t-2 border-black/35">
          <Link
            to="/account/chat"
            className="icon-wrapper-style"
          >
            <ChatBubbleLeftIcon className={`icon-style ${navTab('/account/chat')}`} />

            <p className="responsive-p-style">
              Chat
            </p>
          </Link>

          <Link
            to="/account/contacts"
            className="icon-wrapper-style"
          >
            <UsersIcon className={`icon-style ${navTab('/account/contacts')}`} />

            <p className="responsive-p-style">
              Contacts
            </p>
          </Link>

          <Link
            to="/account/options"
            className="icon-wrapper-style"
          >
            <Cog6ToothIcon className={`icon-style ${navTab('/account/options')}`} />

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
    </FriendsProvider>
  );
}
