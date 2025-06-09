// import { useEffect } from 'react';

import request from '../utils/request.js';
import { baseUrl } from '../utils/consts.js';

const url = `${baseUrl}/users`;

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
  const register = (username: string, email: string, password: string) => {
    return request.post(`${url}/register`, { username, email, password } as Record<string, string>);
  }

  return {
    register,
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