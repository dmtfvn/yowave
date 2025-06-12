import { Routes, Route } from 'react-router';

import Header from './componens/header/Header';

import Login from './componens/login/Login';
import SignUp from './componens/signup/SignUp';

import Home from './componens/home/Home';

import './App.css';

function App() {
  return (
    <div className="min-h-screen flex-center flex-col px-5">
      <Header />

      <main className="flex-center grow w-full">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
