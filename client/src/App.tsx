import { Routes, Route } from 'react-router';

import UserProvider from './componens/provider/UserProvider';

import Header from './componens/header/Header';

import Auth from './componens/guards/Auth';
import Guest from './componens/guards/Guest';

import Login from './componens/login/Login';
import SignUp from './componens/signup/SignUp';

import Home from './componens/home/Home';

import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen flex-center flex-col px-5">
        <Header />

        <main className="flex-center grow w-full">
          <Routes>
            <Route element={<Auth />}>
              <Route path="/home" element={<Home />} />
            </Route>

            <Route element={<Guest />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
