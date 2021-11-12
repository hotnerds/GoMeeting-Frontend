import React, { useState, useRef } from "react";
import axios from "axios";
import "../css/UserSignIn.scss";
import useAsync from "../hooks/useAsync";

async function getToken() {
  // const response = await axios.get("https://getuser");
  // return response.data;
  return null;
}

const UserSignIn = () => {
  const [state, refetch] = useAsync(getToken, [], true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const valid = useRef();

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
      valid.current.style.display = "none";
    } else {
      valid.current.style.display = "";
    }
    setInputs({
      email: "",
      password: "",
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
    <form className="signin-form" onSubmit={onSubmit}>
      <input
        name="email"
        placeholder="id"
        onChange={onChange}
        value={email}
      ></input>
      <span style={{ display: "none" }} ref={valid}>
        유효하지 않은 이메일 형식입니다
      </span>
      <input
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        value={password}
      ></input>
      <button className="signin-loginBtn">Login</button>
    </form>
  );
};

export default UserSignIn;
