import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Diary from './components/Diary';
import Home from './components/Home';
import MyPage from './components/MyPage';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Store from './store';
import Account from './components/Account';
import './App.css';

export default function App() {
  return (
    <Store>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
      </Router>
    </Store>
  );
}
