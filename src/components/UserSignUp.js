import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import '../css/UserSignUp.scss';

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
    gender: 'Female',
    yearOfAdmission: '17',
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
      gender: 'Female',
      yearOfAdmission: '17',
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
    <div className="signup-container">
      <form className="signup-form" onSubmit={onSubmit}>
        <div>이메일</div>
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          value={email}
          required
        />
        {error.email ? (
          <div className="signup-error">이메일을 확인해주세요.</div>
        ) : null}
        <div>비밀번호</div>
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={onChange}
          value={password}
          required
        />
        <div>비밀번호 확인</div>
        <input
          type="password"
          name="passwordCheck"
          placeholder="다시 한 번 입력해주세요."
          onChange={onChange}
          value={passwordCheck}
          required
        />
        {error.password ? (
          <div className="signup-error">비밀번호를 확인해주세요.</div>
        ) : null}
        <div>학교 정보</div>
        <input
          type="text"
          name="school"
          placeholder="학교 정보를 입력해주세요."
          onChange={onChange}
          value={school}
          required
        />
        <div>성별</div>
        <select name="gender" onChange={onChange}>
          <option value="Female">여자</option>
          <option value="Male">남자</option>
        </select>
        <div>학번</div>
        <select name="yearOfAdmission" onChange={onChange}>
          <option value="17">17학번</option>
          <option value="18">18학번</option>
          <option value="19">19학번</option>
          <option value="20">20학번</option>
          <option value="21">21학번</option>
          <option value="21">22학번</option>
        </select>
        <div className="signup-btn-container">
          <button className="signup-btn">회원가입</button>
        </div>
      </form>
      {/* <Link to="api/auth/google">Google로 로그인</Link> */}
    </div>
  );
}

export default UserSignUp;
