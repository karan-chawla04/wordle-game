import React, { useState } from "react";
import "./style.css";
import { WordleIcon } from "../../images";
import { useNavigate } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import HowToPlayDialog from "../HowToPlay/HowToPlayDialog";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const navigate = useNavigate();

  const [htpOpen, setHtpOpen] = useState(false);

  const toggleHtp = () => {
    setHtpOpen(!htpOpen);
  };

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
        <Tooltip title="How to Play" arrow>
          <button onClick={toggleHtp} className="headerButton">
            <QuestionMarkIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Stats" arrow>
          <button className="headerButton">
            <BarChartIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <button className="headerButton">
            <SettingsIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Home" arrow>
          <button onClick={navigateHome} className="headerButton">
            <HomeIcon fontSize="large" />
          </button>
        </Tooltip>
      </div>
      <HowToPlayDialog isOpen={htpOpen} onClose={toggleHtp} />
    </div>
  );
};

export default Header;
