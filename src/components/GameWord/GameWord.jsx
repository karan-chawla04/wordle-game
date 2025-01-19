import React from "react";
import "./style.css";
import { getWordMatchArr } from "../../helpers/general";

const GameWord = ({ userWord, correctWord, custom = false, colors }) => {
  let wordArr = [];

  if (custom) {
    for (let i = 0; i < userWord.length; i++) {
      const x = userWord[i];
      wordArr.push([x, colors[i]]);
    }
  } else {
    if (userWord.length !== correctWord.length) {
      return <></>;
    }

    wordArr = getWordMatchArr(correctWord, userWord);
    for (let i = 0; i < wordArr.length; i++) {
      if (wordArr[i][1] === "grey") {
        wordArr[i][1] = "white";
      }
    }
  }

  return (
    <div className="wordHolder">
      {wordArr.map(([char, color], index) => {
        return (
          <div key={index} className={`letterBox ${color}`}>
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default GameWord;
