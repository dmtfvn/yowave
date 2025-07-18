import { useState } from 'react';
import { Link } from 'react-router';

import AuthInputCtrl from '../inputs/auth-input/AuthInputCtrl';
import AuthInputUnctrl from '../inputs/auth-input/AuthInputUnctrl';
import SubmitButton from '../buttons/submit-button/SubmitButton';

import { useRegister } from '../../api/authApi';

export default function SignUp() {
  const [formState, setFormState] = useState({
    username: '',
    email: ''
  });

  const { errors, isPending, registerAction } = useRegister();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <section className="auth-form-style">
      <h1 className="auth-form-h1-style">
        Create a new account
      </h1>

      <form action={registerAction} className="space-y-9">
        <div>
          <label htmlFor="username" className="label-style">
            Username
          </label>

          <AuthInputCtrl
            label="username"
            hint="Enter username here"
            error={errors.username}
            inputValue={formState.username}
            onTyping={inputChangeHandler}
          />

          {errors.username &&
            <p className="error-msg">{errors.username}</p>
          }
        </div>

        <div>
          <label htmlFor="email" className="label-style">
            Email
          </label>

          <AuthInputCtrl
            label="email"
            hint="Enter email here"
            error={errors.email}
            inputValue={formState.email}
            onTyping={inputChangeHandler}
          />

          {errors.email &&
            <p className="error-msg">{errors.email}</p>
          }
        </div>

        <div>
          <label htmlFor="password" className="label-style">
            Password
          </label>

          <AuthInputUnctrl
            label="password"
            hint="Enter password here"
            error={errors.password}
          />

          {errors.password &&
            <p className="error-msg">{errors.password}</p>
          }
        </div>

        <div>
          <label htmlFor="rePassword" className="label-style">
            Repeat password
          </label>

          <AuthInputUnctrl
            label="rePassword"
            hint="Enter repeated password here"
            error={errors.rePassword}
          />

          {errors.rePassword &&
            <p className="error-msg">{errors.rePassword}</p>
          }
        </div>

        {errors.general &&
          <p className="error-msg text-center">{errors.general}</p>
        }

        <SubmitButton
          label="Sign Up"
          pending={isPending}
          style="submit-style"
        />
      </form>

      <p className="auth-form-p-style">
        Already have an account?{' '}
        <Link to="/auth/login" className="auth-form-link-style">
          Log In
        </Link>
      </p>
    </section>
  );
}
