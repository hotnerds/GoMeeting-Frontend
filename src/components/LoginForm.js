import React, { useState } from 'react';
import axios from 'axios';
import '../css/LoginForm.scss';
import useAsync from '../hooks/useAsync';

async function getToken() {
  const response = await axios.get('https://getuser');
  return response.data;
}

const LoginForm = () => {
  const [state, refetch] = useAsync(getToken, [], true);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

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
      // refetch();
      console.log('유효합니다');
    } else {
      console.log('유효한 이메일을 입력해주세요.');
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
  // if (!token) {
  //   console.log("error occured: token is null");
  //   return null;
  // }

  return (
    <form className="loginform-Div" onSubmit={onSubmit}>
      <input
        name="email"
        placeholder="id"
        onChange={onChange}
        value={email}
      ></input>
      <input
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        value={password}
      ></input>
      <button className="loginform-loginBtn">Login</button>
    </form>
  );
};

export default LoginForm;
