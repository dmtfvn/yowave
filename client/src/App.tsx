import { Routes, Route } from 'react-router';

import UserProvider from './componens/providers/UserProvider';

import Auth from './componens/guards/Auth';
import Guest from './componens/guards/Guest';

import Splash from './componens/splash/Splash ';

import Login from './componens/login/Login';
import SignUp from './componens/signup/SignUp';

import Account from './componens/account/Account';
import Chat from './componens/account/Chat';
import Contacts from './componens/account/Contacts';
import Options from './componens/account/Options';

import './App.css';

function App() {
  return (
    <UserProvider>
      <main className="relative flex-center min-h-screen px-2">
        <Routes>
          <Route path="/" element={<Splash />} />

          <Route element={<Auth />}>
            <Route path="/account" element={<Account />}>
              <Route path="chat" element={<Chat />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="options" element={<Options />} />
            </Route>
          </Route>

          <Route element={<Guest />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;
