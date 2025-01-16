import React from "react";
import { useState } from "react";
import { WordleIcon } from "../../images";
import HowToPlayDialog from "../../components/HowToPlay/HowToPlayDialog";
import "./style.css";

const Home = () => {
  const [htpOpen, setHtpOpen] = useState(false);

  const toggleHowToPlay = () => {
    setHtpOpen(!htpOpen);
  };

  return (
    <div className="homeContainer">
      <div className="iconHolder">
        <img src={WordleIcon} alt="" />
      </div>
      <h1>Wordle</h1>
      <h2>Get 6 chances to guess the word</h2>
      <div className="buttonHolder">
        <button>About</button>
        <button onClick={toggleHowToPlay}>How to Play</button>
        <button className="main">Play</button>
      </div>
      <div className="disclaimer">
        <strong>Disclaimer: </strong> This is just a copy of wordle game from
        nytimes, it was created for learning purposes only. Please play the
        official game at nytime's official site. Thanks.
      </div>
      <HowToPlayDialog isOpen={htpOpen} onClose={toggleHowToPlay} />
    </div>
  );
};

export default Home;
