import React from 'react';
import UserSignIn from '../components/UserSignIn';
import { Link } from 'react-router-dom';
import '../css/Auth.scss';

const Auth = () => {
  return (
    <div>
      <UserSignIn />
      <Link className="auth-signup" to="/register">
        sign up
      </Link>
    </div>
  );
};

export default Auth;
