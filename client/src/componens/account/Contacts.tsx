import { useContext } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/solid';

import { FriendsContext } from '../contexts/FriendsContext';

import MainInput from '../inputs/main-input/MainInput';

import Friend from '../friend/Friend';
import { friendSchema } from '../../schemas/friendSchema';

import useErrors from '../../hooks/useErrors';

export default function Contacts() {
  const { friendList, setFriendList } = useContext(FriendsContext);

  const { errors, errorsHandler } = useErrors();

  const contactHandler = async (formData: FormData): Promise<void> => {
    const data = Object.fromEntries(formData.entries());

    try {
      const friendData = await friendSchema.validate(data, {
        abortEarly: false,
      });

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
      <form action={contactHandler} className="flex flex-col gap-4">
        <h1 className="text-2xl/6 font-palanquin text-center text-stone-700">
          Add contact
        </h1>

        {errors &&
          <p className="error-msg text-center">{errors.contact}</p>
        }

        <div className="w-full">
          <MainInput
            label="contact"
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
          {friendList.map(f => (
            <Friend
              // key={}
              {...f}
            />
          ))}

          {!friendList.length &&
            <div className="absolute flex-center inset-2">
              <p className="text-md font-bold txt-shadow">Your list is empty</p>
            </div>
          }
        </section>
      </div>
    </section>
  );
}
