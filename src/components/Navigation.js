import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.scss";

const Navigation = () => {
  return (
    <div class="navigation">
      <div>
        <Link to="/">{/* <img src="person.png" /> */}홈</Link>
      </div>
      <div>
        <Link to="/profile">{/* <img src="profile.png" /> */}내 정보</Link>
      </div>
      <div>
        <Link to="/matching">{/* <img src="matching.png" /> */}매칭</Link>
      </div>
      <div>
        <Link to="/chatting">{/* <img src="chatting.png" /> */}채팅</Link>
      </div>
    </div>
  );
};

export default Navigation;
