import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../css/UserSignIn.scss';
import useAsync from '../hooks/useAsync';

async function getToken() {
  // const response = await axios.get("https://getuser");
  // return response.data;
  return {
    response: 'tokentest',
  };
}

const UserSignIn = () => {
  const [state, refetch] = useAsync(getToken, [], true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const valid = useRef();
  const navigate = useNavigate();

  const { email, password } = inputs;
  const { loading, data: token, error } = state;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (regExp.test(email)) {
      // email is valid
      refetch();
      valid.current.style.display = 'none';
    } else {
      valid.current.style.display = '';
    }
    setInputs({
      email: '',
      password: '',
    });
  };

  // if (loading) return <div>로딩중</div>;
  // if (error) {
  //   console.log(`error occured : ${error}`);
  //   return null;
  // }
  if (!token) {
    return (
      <form className="signin-form" onSubmit={onSubmit}>
        <input
          name="email"
          placeholder="학교 계정"
          onChange={onChange}
          value={email}
        ></input>
        <span style={{ display: 'none' }} ref={valid}>
          유효하지 않은 이메일 형식입니다
        </span>
        <input
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={password}
        ></input>
        <button className="signin-loginBtn">로그인</button>
      </form>
    );
  } else {
    localStorage.setItem('accessToken', token.response);
    navigate('/');
  }

  return null;
};

export default UserSignIn;
