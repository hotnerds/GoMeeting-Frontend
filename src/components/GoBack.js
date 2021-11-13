import React from 'react';
import { useNavigate } from 'react-router';
import '../css/GoBack.scss';

const GoBack = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className="goback-btn" onClick={handleClick}>
        ←
      </button>
    </div>
  );
};

export default GoBack;
