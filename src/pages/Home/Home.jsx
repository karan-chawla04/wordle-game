import React from "react";
import { WordleIcon } from "../../images";
import "./style.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="iconHolder">
        <img src={WordleIcon} alt="" />
      </div>
      <h1>Wordle</h1>
      <div className="buttonHolder">
        <button>About</button>
        <button>How to Play</button>
        <button className="main">Play</button>
      </div>
      <div className="disclaimer">
        <strong>Disclaimer: </strong> This is just a copy of wordle game from
        nytimes, it was created for learning purposes only. Please play the
        official game at nytime's official site. Thanks.
      </div>
    </div>
  );
};

export default Home;
