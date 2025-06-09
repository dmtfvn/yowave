import { useState } from 'react';
import { Link } from 'react-router';

import { useLogin } from '../../api/authApi';

import AuthInputUnctrl from '../inputs/auth-input/AuthInputUnctrl';
import SubmitButton from '../buttons/submit-button/SubmitButton';

export default function Login() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const { login } = useLogin();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);

    try {
      await login(
        userData.email,
        userData.password
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }

      form.reset();
    } finally {
      setIsPending(false);
    }

    console.log(userData);
  }

  return (
    <section className="flex max-w-[17.5em] flex-1 flex-col justify-center py-12">
      <h1 className="mb-10 text-center text-2xl/9 font-bold text-teal-800">
        Sign in your account
      </h1>

      <form onSubmit={loginHandler} className="space-y-9">
        <div>
          <label htmlFor="email" className="label-style">
            Email
          </label>

          <AuthInputUnctrl
            label="email"
            hint="Enter email here"
          />
        </div>

        <div>
          <label htmlFor="password" className="label-style">
            Password
          </label>

          <AuthInputUnctrl
            label="password"
            hint="Enter password here"
          />
        </div>

        {error &&
          <p className="error-msg text-center">{error}</p>
        }

        <SubmitButton
          label="Log In"
          pending={isPending}
          style="submit-style"
        />
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Don&rsquo;t have an account?{' '}
        <Link to="/signup" className="font-semibold text-teal-600">
          Sign Up here
        </Link>
      </p>
    </section>
  );
}
