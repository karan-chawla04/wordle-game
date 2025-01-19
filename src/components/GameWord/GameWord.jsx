import React from "react";
import "./style.css";

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

    let correctWordMap = new Map();

    for (let i = 0; i < correctWord.length; i++) {
      const x = correctWord[i];
      if (correctWordMap.has(x)) {
        const currentCount = correctWordMap.get(x);
        correctWordMap.set(x, currentCount + 1);
      } else {
        correctWordMap.set(x, 1);
      }
    }

    for (let i = 0; i < userWord.length; i++) {
      const x = userWord[i];
      if (x === correctWord[i]) {
        wordArr.push([x, "green"]);
        correctWordMap.set(x, correctWordMap.get(x) - 1);
      } else {
        if (correctWordMap.has(x) && correctWordMap.get(x) > 0) {
          wordArr.push([x, "yellow"]);
          correctWordMap.set(x, correctWordMap.get(x) - 1);
        } else {
          wordArr.push([x, "white"]);
        }
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
