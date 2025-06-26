import { useContext } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';

import { FriendsContext } from '../contexts/FriendsContext';

import MainInput from '../inputs/main-input/MainInput';

import Friend from '../friend/Friend';
import { friendSchema } from '../../schemas/friendSchema';

import useErrors from '../../hooks/useErrors';

import socket from '../../lib/socket';
import useSocketIO from '../../hooks/useSocketIO';

export default function Contacts() {
  const { friendList, setFriendList } = useContext(FriendsContext);

  const { loading } = useSocketIO(setFriendList);

  const { errors, errorsHandler } = useErrors();

  const friendHandler = async (formData: FormData): Promise<void> => {
    const data = Object.fromEntries(formData.entries());

    try {
      const friendData = await friendSchema.validate(data, {
        abortEarly: false,
      });

      if (friendData.friend) {
        socket.emit('reqData', friendData.friend, (errMessage, res) => {
          if (errMessage) {
            errorsHandler(new Error(errMessage));
            return;
          }

          setFriendList(res);
        });
      }
      console.log(friendData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorsHandler(err);
      } else {
        errorsHandler(new Error('Unknown error'));
      }
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

        <div className="w-full">
          <MainInput
            label="friend"
            hint="Type here to add a contact"
          />

          <button className="flex justify-center w-full rounded-md bg-stone-800 mt-2 py-2 cursor-pointer">
            <UserPlusIcon className="size-4" />
          </button>
        </div>
      </form>

      <div className="mt-20">
        <h2 className="text-xl/6 font-palanquin text-center text-stone-700 mb-2">
          Contact List
        </h2>

        <section className="relative flex flex-col min-h-[3.55em] rounded-lg border border-stone-800 px-2 divide-y">
          {loading &&
            <h2 className="absolute flex-center text-blue-600 inset-2">
              Loading ...
            </h2>
          }

          {friendList.map(f => (
            <Friend
              key={f.id}
              {...f}
            />
          ))}

          {!loading && !friendList.length &&
            <div className="absolute flex-center inset-2">
              <p className="text-md font-bold txt-shadow">Your list is empty</p>
            </div>
          }
        </section>
      </div>
    </section>
  );
}
