import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserSignUp from './components/UserSignUp';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route expact path="/"></Route>
        <Route expact path="/auth" element={<LoginForm />}></Route>
        <Route expact path="/register" element={<UserSignUp />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
