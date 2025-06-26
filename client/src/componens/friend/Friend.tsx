import { FriendT } from '../../types/friend/FriendT';

export default function Friend({
  username,
  online,
}: FriendT) {
  return (
    <div className="flex items-center hover:bg-black/15 cursor-pointer p-2">
      <img
        src="/user-icon.png"
        alt="user icon"
        className={`max-w-[2.5em] rounded-full border-2 ${online ? 'border-green-600' : 'border-red-600'}`}
      />

      <p className="contact-username-style">{username}</p>
    </div>
  );
}
