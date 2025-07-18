import { UserPlusIcon } from '@heroicons/react/24/solid';

import useFriendContext from '../../hooks/contexts/useFriendContext';
import useErrors from '../../hooks/useErrors';

import { friendSchema } from '../../schemas/friendSchema';

import Friend from '../friend/Friend';

import useSocket from '../../hooks/sockets/useSocket';
import useFriendListSocket from '../../hooks/sockets/useFriendListSocket';
import socket from '../../lib/socket';

import Spinner from '../spinner/Spinner';

export default function Contacts() {
  const { friendList, setFriendList } = useFriendContext();

  useSocket();

  const { loadingList } = useFriendListSocket();

  const { errors, setErrors, errorsHandler } = useErrors();

  const friendHandler = async (formData: FormData): Promise<void> => {
    const data = Object.fromEntries(formData.entries());

    if (!data.friend) {
      setErrors({});
    }

    try {
      const friendData = await friendSchema.validate(data, {
        abortEarly: false
      });

      if (friendData.friend) {
        socket.emit('friendName', friendData.friend, (errMessage, res) => {
          if (errMessage) {
            errorsHandler(new Error(errMessage));
            return;
          }

          setFriendList(res);
          setErrors({});
        });
      }
    } catch (err) {
      errorsHandler(err);
    }
  }

  return (
    <section className="max-w-[20.5em] w-full mt-16">
      <form action={friendHandler} className="flex flex-col gap-4">
        <h1 className="text-2xl/6 font-palanquin text-center text-stone-700">
          Add contact
        </h1>

        {errors.friend &&
          <p className="error-msg text-center">{errors.friend}</p>
        }

        {errors.general &&
          <p className="error-msg text-center">{errors.general}</p>
        }

        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            name="friend"
            placeholder="Type here to add a contact"
            autoComplete="off"
            className="main-input-style"
          />

          <button className="flex justify-center w-full rounded-md bg-stone-800 py-2 cursor-pointer">
            <UserPlusIcon className="size-4" />
          </button>
        </div>
      </form>

      <div className="mt-20">
        <h2 className="text-xl/6 font-palanquin text-center text-stone-700 mb-2">
          Contact List
        </h2>

        <section className="relative flex flex-col min-h-[3.55em] rounded-lg border border-stone-800 px-2 divide-y">
          {loadingList
            ?
            <Spinner />
            :
            friendList.map(f => (
              <Friend
                key={f.id}
                {...f}
              />
            ))
          }

          {!loadingList && !friendList.length &&
            <div className="absolute flex-center inset-2">
              <p className="text-md font-bold txt-shadow">Your list is empty</p>
            </div>
          }
        </section>
      </div>
    </section>
  );
}
