import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WordleIcon } from "../../images";
import HowToPlayDialog from "../../components/HowToPlay/HowToPlayDialog";
import AboutDialog from "../../components/About/AboutDialog";
import "./style.css";

const Home = () => {
  const [htpOpen, setHtpOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const navigate = useNavigate();

  const toggleHowToPlay = () => {
    setHtpOpen(!htpOpen);
  };

  const toggleAbout = () => {
    setAboutOpen(!aboutOpen);
  };

  const handlePlay = () => {
    navigate("/game");
  };

  return (
    <div className="homeContainer">
      <div className="iconHolder">
        <img src={WordleIcon} alt="" />
      </div>
      <h1>Wordle</h1>
      <h2>Get 6 chances to guess the word</h2>
      <div className="buttonHolder">
        <button onClick={toggleAbout}>About</button>
        <button onClick={toggleHowToPlay}>How to Play</button>
        <button className="main" onClick={handlePlay}>
          Play
        </button>
      </div>
      <div className="disclaimer">
        <strong>Disclaimer: </strong> This is just a copy of wordle game from
        nytimes, it was created for learning purposes only. Please play the
        official game at nytime's official site. Thanks.
      </div>
      <HowToPlayDialog isOpen={htpOpen} onClose={toggleHowToPlay} />
      <AboutDialog isOpen={aboutOpen} onClose={toggleAbout} />
    </div>
  );
};

export default Home;
