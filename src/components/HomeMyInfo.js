import React from "react";
import "../css/HomeMyInfo.scss";
// import axios from "axios";

// async function getInfo() {
//   const response = await axios.get("https://getuser");
//   return response.data;
// }

const HomeMyInfo = () => {
  // get my info from backend
  //   const { mannerScore, position, yearOfAdmission, gender, univ } = useAsync(
  //     getInfo,
  //     [],
  //     true
  //   );
  // dummy
  const mannerScore = 4.5;
  const position = "언변가";
  const yearOfAdmission = 17;
  const gender = "남";
  const univ = "Korea Univ.";

  return (
    <div>
      <div className="home-profile">
        <ul>
          <li>{position}</li>
          <li>{mannerScore} / 5</li>
          <li>{univ}</li>
          <li>
            {yearOfAdmission} 학번 / {gender}
          </li>
        </ul>
      </div>

      <div className="home-image">
        <div className="home-image-div">
          <img src="person.png" alt="내 사진" />
        </div>
      </div>
    </div>
  );
};

export default HomeMyInfo;
