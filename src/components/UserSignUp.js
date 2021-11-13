import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/UserSignUp.scss';
import useAsync from '../hooks/useAsync';
import { useNavigate } from 'react-router';

const code = (Math.floor(Math.random() * 90000) + 10000).toString();

const sendSignUpForm = async (formData) => {
  console.log({ ...formData, code });
  // const response = await axios({
  //   method: 'post',
  //   url: '/',
  //   data: formData,
  // });
};

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };
  return { value, onChange };
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

  const emailValid = useRef();
  const passwordValid = useRef();
  const postButton = useRef();
  const finalAuth = useRef();
  const verifyCode = useRef();
  const codeValid = useRef();
  const [state, refetch] = useAsync(() => sendSignUpForm(signUpForm), [], true);
  const userCode = useInput('');
  const navigate = useNavigate();

  const { email, password, passwordCheck, school } = signUpForm;
  const { loading, data, error } = state;

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
  const onEmailSubmit = (e) => {
    const submitError = {
      email: false,
      password: false,
    };
    e.preventDefault();
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(email)) {
      // email is wrong
      emailValid.current.style.display = '';
      submitError.email = true;
    } else {
      emailValid.current.style.display = 'none';
      submitError.email = false;
    }
    if (password !== passwordCheck) {
      // password is wrong
      passwordValid.current.style.display = '';
      submitError.password = true;
    } else {
      passwordValid.current.style.display = 'none';
      submitError.password = false;
    }
    if (!submitError.email && !submitError.password) {
      refetch();
      postButton.current.style.display = 'none';
      finalAuth.current.style.display = '';
    }
  };

  const onAuthSubmit = (e) => {
    e.preventDefault();
    if (verifyCode.current.value === code) {
      navigate('/');
    } else {
      codeValid.current.style.display = '';
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onEmailSubmit}>
        <div>이메일</div>
        <input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          value={email}
          required
        />
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={emailValid}
        >
          이메일을 확인해주세요.
        </div>
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
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={passwordValid}
        >
          비밀번호를 확인해주세요.
        </div>

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
          <option value="22">22학번</option>
        </select>
        <div className="signup-btn-container" ref={postButton}>
          <button className="signup-btn">이메일 인증하기</button>
        </div>
      </form>
      <form
        className="final-auth-form"
        // style={{ display: 'none' }}
        ref={finalAuth}
        onSubmit={onAuthSubmit}
        style={{ display: 'none' }}
      >
        <input
          type="text"
          placeholder="메일에 적혀있는 번호를 적어주세요"
          {...userCode}
          ref={verifyCode}
        />
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={codeValid}
        >
          코드를 확인해주세요.
        </div>
        <div className="final-auth-btn-container">
          <button className="final-auth-btn">가입 완료</button>
        </div>
      </form>
    </div>
  );
}

export default UserSignUp;
