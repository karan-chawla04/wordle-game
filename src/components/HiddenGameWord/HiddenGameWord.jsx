import React from "react";
import "./style.css";

const HiddenGameWord = ({ word, reveal }) => {
  const wordArr = word.split("");
  return (
    <div className="hiddenWordHolder">
      {wordArr.map((char, index) => {
        return (
          <div key={index} className="letterBox">
            {char}
          </div>
        );
      })}
      <div className="blurrBox">
        <div className="revealLink" onClick={reveal}>
          Reveal Answer
        </div>
      </div>
    </div>
  );
};

export default HiddenGameWord;
