import { useActionState } from 'react';

import useUserContext from '../hooks/contexts/useUserContext.js';

import { SignupFormValues, signupSchema } from '../schemas/signupSchema.js';
import useErrors from '../hooks/useErrors.js';

import request from '../utils/request.js';
import { baseUrl } from '../utils/consts.js';

const url = `${baseUrl}/auth`;

export const useLogin = () => {
  const { errors, errorsHandler } = useErrors();

  const { userLogin } = useUserContext();

  const loginHandler = async (_: void, formData: FormData): Promise<void> => {
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      if (Object.values(userData).some(el => el === '')) {
        throw new Error('All fields are required');
      }

      const authData = await request.post(`${url}/login`, {
        email: userData.email,
        password: userData.password
      });

      console.log('login', authData)
      userLogin(authData);
    } catch (err) {
      errorsHandler(err);
    }
  }

  const [, loginAction, isPending] = useActionState(loginHandler, undefined);

  return {
    errors,
    isPending,
    loginAction
  };
}

export const useRegister = () => {
  const { errors, errorsHandler } = useErrors();

  const { userLogin } = useUserContext();

  const registerHandler = async (_: void, formData: FormData): Promise<void> => {
    const userData = Object.fromEntries(formData.entries());

    try {
      const yupData: SignupFormValues = await signupSchema.validate(userData, {
        abortEarly: false
      });

      const authData = await request.post(`${url}/register`, {
        username: yupData.username,
        email: yupData.email,
        password: yupData.password
      });

      console.log('register', authData)
      userLogin(authData);
    } catch (err) {
      errorsHandler(err);
    }
  }

  const [, registerAction, isPending] = useActionState(registerHandler, undefined);

  return {
    errors,
    isPending,
    registerAction
  };
}

export const useLogout = () => {
  const { userLogout } = useUserContext();

  const logoutHandler = () => {
    request.get(`${url}/logout`);

    userLogout();
  }

  return {
    logoutHandler
  };
}
