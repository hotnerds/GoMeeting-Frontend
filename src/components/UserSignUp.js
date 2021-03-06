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
      navigate('/auth');
    } else {
      codeValid.current.style.display = '';
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onEmailSubmit}>
        <div>?????????</div>
        <input
          type="text"
          name="email"
          placeholder="???????????? ??????????????????"
          onChange={onChange}
          value={email}
          required
        />
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={emailValid}
        >
          ???????????? ??????????????????.
        </div>
        <div>????????????</div>
        <input
          type="password"
          name="password"
          placeholder="??????????????? ??????????????????."
          onChange={onChange}
          value={password}
          required
        />
        <div>???????????? ??????</div>
        <input
          type="password"
          name="passwordCheck"
          placeholder="?????? ??? ??? ??????????????????."
          onChange={onChange}
          value={passwordCheck}
          required
        />
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={passwordValid}
        >
          ??????????????? ??????????????????.
        </div>

        <div>?????? ??????</div>
        <input
          type="text"
          name="school"
          placeholder="?????? ????????? ??????????????????."
          onChange={onChange}
          value={school}
          required
        />
        <div>??????</div>
        <select name="gender" onChange={onChange}>
          <option value="Female">??????</option>
          <option value="Male">??????</option>
        </select>
        <div>??????</div>
        <select name="yearOfAdmission" onChange={onChange}>
          <option value="17">17??????</option>
          <option value="18">18??????</option>
          <option value="19">19??????</option>
          <option value="20">20??????</option>
          <option value="21">21??????</option>
          <option value="22">22??????</option>
        </select>
        <div className="signup-btn-container" ref={postButton}>
          <button className="signup-btn">????????? ????????????</button>
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
          placeholder="????????? ???????????? ????????? ???????????????"
          {...userCode}
          ref={verifyCode}
        />
        <div
          className="signup-error"
          style={{ display: 'none' }}
          ref={codeValid}
        >
          ????????? ??????????????????.
        </div>
        <div className="final-auth-btn-container">
          <button className="final-auth-btn">?????? ??????</button>
        </div>
      </form>
    </div>
  );
}

export default UserSignUp;
