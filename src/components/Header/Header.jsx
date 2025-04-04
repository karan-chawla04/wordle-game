import React, { useState } from "react";
import "./style.css";
import { WordleIcon } from "../../images";
import { useNavigate } from "react-router-dom";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BarChartIcon from "@mui/icons-material/BarChart";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HowToPlayDialog from "../HowToPlay/HowToPlayDialog";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import StatsDialog from "../Stats/StatsDialog";
import MobileNav from "./MobileNav";
import HelpBot from "../HelpBot/HelpBot";

const Header = ({ gameState, markSuggested, resetGame }) => {
  const navigate = useNavigate();

  const [htpOpen, setHtpOpen] = useState(false);
  const [statOpen, setStateOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const toggleHtp = () => {
    setHtpOpen(!htpOpen);
  };

  const toggleStat = () => {
    setStateOpen(!statOpen);
  };

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="headerContainer">
      <div className="headerStart">
        <div onClick={navigateHome} className="headerLogo">
          <div className="headerIcon">
            <img src={WordleIcon} alt="" />
          </div>
          <h1>Wordle</h1>
        </div>
        <button onClick={toggleNav} className="headerButton onlyMobile">
          <MenuIcon fontSize="large" />
        </button>
      </div>
      <div className="headerContent">
        <Tooltip title="New Game" arrow>
          <button onClick={resetGame} className="headerButton">
            <PlayCircleIcon fontSize="large" />
          </button>
        </Tooltip>
        <HelpBot gameState={gameState} markSuggested={markSuggested} />
        <Tooltip title="How to Play" arrow>
          <button onClick={toggleHtp} className="headerButton">
            <QuestionMarkIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Stats" arrow>
          <button onClick={toggleStat} className="headerButton">
            <BarChartIcon fontSize="large" />
          </button>
        </Tooltip>
        {/* <Tooltip title="Settings" arrow>
          <button className="headerButton">
            <SettingsIcon fontSize="large" />
          </button>
        </Tooltip> */}
        <Tooltip title="Home" arrow>
          <button onClick={navigateHome} className="headerButton">
            <HomeIcon fontSize="large" />
          </button>
        </Tooltip>
      </div>
      <HowToPlayDialog isOpen={htpOpen} onClose={toggleHtp} />
      <StatsDialog isOpen={statOpen} onClose={toggleStat} />
      <MobileNav isOpen={navOpen} onClose={toggleNav}>
        <div className="mobileNavContainer">
          <div className="navHeader">
            <div className="headerIcon">
              <img src={WordleIcon} alt="" />
            </div>
            <h1>Wordle</h1>
          </div>
          <div className="navButtonList">
            <button
              onClick={() => {
                toggleNav();
                resetGame();
              }}
              className="navBarButton"
            >
              <PlayCircleIcon fontSize="large" />
              New Game
            </button>
            <button
              onClick={() => {
                toggleNav();
                toggleHtp();
              }}
              className="navBarButton"
            >
              <QuestionMarkIcon fontSize="large" />
              How To Play
            </button>
            {/* <button onClick={toggleStat} className="navBarButton">
              <BarChartIcon fontSize="large" />
              Statistics
            </button> */}
            {/* <button className="navBarButton">
              <SettingsIcon fontSize="large" />
              Settings
            </button> */}
            <button onClick={navigateHome} className="navBarButton">
              <HomeIcon fontSize="large" />
              Home
            </button>
          </div>
        </div>
      </MobileNav>
    </div>
  );
};

export default Header;
