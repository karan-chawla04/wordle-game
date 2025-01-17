import React from "react";
import "./style.css";
import { WordleIcon } from "../../images";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="headerContainer">
      <div onClick={navigateHome} className="headerLogo">
        <div className="headerIcon">
          <img src={WordleIcon} alt="" />
        </div>
        <h1>Wordle</h1>
      </div>
      <div className="headerContent">
        <div>Some</div>
        <div>Some</div>
        <div>Some</div>
      </div>
    </div>
  );
};

export default Header;
