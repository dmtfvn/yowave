import { useActionState, useState } from 'react';

import request from '../utils/request.js';
import { baseUrl } from '../utils/consts.js';

import { SignupFormValues, signupSchema } from '../schemas/signupSchema.js';
import useErrors from '../hooks/useErrors.js';

const url = `${baseUrl}/auth`;

export const useLogin = () => {
  const [error, setError] = useState('');

  const loginHandler = async (_: void, formData: FormData): Promise<void> => {
    const userData = Object.fromEntries(formData.entries());

    try {
      if (Object.values(userData).some(el => el === '')) {
        throw new Error('All fields are required');
      }

      const authData = await request.post(`${url}/login`, {
        email: userData.email.toString(),
        password: userData.password.toString(),
      });

      console.log(authData)//for user context
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    }

    console.log(userData);
  }

  const [, loginAction, isPending] = useActionState(loginHandler, undefined);

  return {
    error,
    isPending,
    loginAction,
  };
}

export const useRegister = () => {
  const { errors, errorsHandler } = useErrors();

  const registerHandler = async (_: void, formData: FormData): Promise<void> => {
    const userData = Object.fromEntries(formData.entries());

    try {
      const yupData: SignupFormValues = await signupSchema.validate(userData, {
        abortEarly: false,
      });

      const authData = await request.post(`${url}/register`, {
        username: yupData.username,
        email: yupData.email,
        password: yupData.password,
      });

      console.log(authData)//for user context
    } catch (err: unknown) {
      if (err instanceof Error) {
        errorsHandler(err);
      } else {
        errorsHandler(new Error('Unknown error'));
      }
    }

    console.log(userData)
  }

  const [, registerAction, isPending] = useActionState(registerHandler, undefined);

  return {
    errors,
    isPending,
    registerAction,
  };
}
