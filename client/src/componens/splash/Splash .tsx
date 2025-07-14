import { useNavigate } from 'react-router';

import useUserContext from '../../hooks/contexts/useUserContext';

import request from '../../utils/request';
import { baseUrl } from '../../utils/consts';

const url = `${baseUrl}/auth`;

export default function Splash() {
  const navigate = useNavigate();

  const { userLogin } = useUserContext();

  const refreshToken = async () => {
    try {
      const tokenData = await request.post(`${url}/refresh`, {});

      userLogin(tokenData);

      navigate('/account/chat');
    } catch {
      navigate('/auth/login');
    }
  }

  return (
    <button
      onClick={refreshToken}
      className="flex max-w-[15em] h-auto cursor-pointer"
    >
      <img src="/logo.png" alt="yowave logo" />
    </button>
  );
}
