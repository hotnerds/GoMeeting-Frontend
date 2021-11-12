import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './routes/Auth';
import UserSignUp from './components/UserSignUp';
import Home from './routes/Home';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route expact path="/" element={<Home />}></Route>
        <Route expact path="/auth" element={<Auth />}></Route>
        <Route expact path="/register" element={<UserSignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
