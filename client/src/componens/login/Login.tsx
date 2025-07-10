import { Link } from 'react-router';

import AuthInputUnctrl from '../inputs/auth-input/AuthInputUnctrl';
import SubmitButton from '../buttons/submit-button/SubmitButton';

import { useLogin } from '../../api/authApi';

export default function Login() {
  const { errors, isPending, loginAction } = useLogin();

  return (
    <section className="auth-form-style">
      <h1 className="auth-form-h1-style">
        Sign in your account
      </h1>

      <form action={loginAction} className="space-y-9">
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

        {errors.general &&
          <p className="error-msg text-center">{errors.general}</p>
        }

        <SubmitButton
          label="Log In"
          pending={isPending}
          style="submit-style"
        />
      </form>

      <p className="auth-form-p-style">
        Don&rsquo;t have an account?{' '}
        <Link to="/auth/signup" className="auth-form-link-style">
          Sign Up here
        </Link>
      </p>
    </section>
  );
}
