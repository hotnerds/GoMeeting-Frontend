import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

const INVALID_EMAIL = 'INVALID_EMAIL';
const INVALID_PASSWORD = 'INVALID_PASSWORD';
const VALID_EMAIL = 'VALID_EMAIL';
const VALID_PASSWORD = 'VALID_PASSWORD';
const initialState = {
  email: false,
  password: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case INVALID_EMAIL:
      return {
        ...state,
        email: true,
      };
    case INVALID_PASSWORD:
      return {
        ...state,
        password: true,
      };
    case VALID_EMAIL:
      return {
        ...state,
        email: false,
      };
    case VALID_PASSWORD:
      return {
        ...state,
        password: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function UserSignUp() {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    school: '',
  });
  const [error, dispatch] = useReducer(reducer, initialState);

  const { email, password, passwordCheck, school } = signUpForm;

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };
  const resetForm = () => {
    setSignUpForm({
      email: '',
      password: '',
      passwordCheck: '',
      school: '',
    });
  };

  useEffect(() => {
    console.log(error);
    if (!error.email && !error.password) {
      resetForm();
    }
  }, [error]);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signUpForm);
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    regExp.test(email)
      ? dispatch({ type: VALID_EMAIL })
      : dispatch({ type: INVALID_EMAIL });
    password === passwordCheck
      ? dispatch({ type: VALID_PASSWORD })
      : dispatch({ type: INVALID_PASSWORD });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>Email</div>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={onChange}
          value={email}
          required
        />
        {error.email ? <div>check your Email!</div> : null}
        <div>Password</div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={onChange}
          value={password}
          required
        />
        <div>Password check</div>
        <input
          type="password"
          name="passwordCheck"
          placeholder="password"
          onChange={onChange}
          value={passwordCheck}
          required
        />
        {error.password ? <div>Check your password!</div> : null}
        <div>School</div>
        <input
          type="text"
          name="school"
          placeholder="school"
          onChange={onChange}
          value={school}
          required
        />
        <div>
          <button>Submit</button>
        </div>
      </form>
      {/* <Link to="api/auth/google">Google로 로그인</Link> */}
    </div>
  );
}

export default UserSignUp;
