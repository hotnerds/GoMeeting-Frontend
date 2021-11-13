import React from 'react';
import UserSignIn from '../components/UserSignIn';
import { Link } from 'react-router-dom';
import '../css/Auth.scss';
import { ReactComponent as Logo } from '../assets/Logo.svg';

const Auth = () => {
  return (
    <wrapper>
      <Logo className="auth-logo" />
      <div className="auth-container">
        <UserSignIn />
        <Link className="auth-signup" to="/register">
          회원가입
        </Link>
      </div>
    </wrapper>
  );
};

export default Auth;
