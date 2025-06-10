import { useActionState } from 'react';

import request from '../utils/request.js';
import { baseUrl } from '../utils/consts.js';

import { signupSchema } from '../schemas/signupSchema.js';
import useErrors from '../hooks/useErrors.js';

const url = `${baseUrl}/api/auth`;

export const useLogin = () => {
  const login = async (email: FormDataEntryValue, password: FormDataEntryValue) => {
    const result = await request.post(`${url}/login`, { email, password } as Record<string, string>);

    return result;
  }

  return {
    login,
  };
}

export const useRegister = () => {
  const { errors, errorsHandler } = useErrors();

  const registerHandler = async (_: void, formData: FormData): Promise<void> => {
    const userData = Object.fromEntries(formData.entries());

    try {
      const yupData = await signupSchema.validate(userData, {
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

// export const useLogout = () => {
//   useEffect(() => {
//     request.get(`${url}/logout`, undefined)
//       .finally(() => {
//         userLogout();
//       });
//   }, [userLogout]);

//   return {
//     isLoggedOut: !!accessToken,
//   };
// }