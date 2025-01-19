import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { getWordMatchArr } from "../../helpers/general";

const EmptyWord = ({ isActive, userWord, submitted, correctWord, shake }) => {
  const arr = [0, 1, 2, 3, 4];

  let matchArr = [];
  if (submitted) {
    matchArr = getWordMatchArr(correctWord, userWord);
  }

  return (
    <div className={`emptyWordHolder ${!!shake && "shake"}`}>
      {arr.map((i) => {
        const delay = submitted ? `${i * 0.1}s` : "0s";

        if (userWord.length <= i) {
          return (
            <div
              key={i}
              className={`emptyLetterBox`}
              style={{ animationDelay: delay }}
            >
              {""}
            </div>
          );
        } else {
          const className =
            submitted && matchArr && matchArr.length > 0
              ? `emptyLetterBox ${matchArr[i][1]}`
              : `emptyLetterBox ${submitted && "submitted"}`;

          return (
            <div
              key={i}
              className={className}
              style={{ animationDelay: delay }}
            >
              {userWord[i]}
            </div>
          );
        }
      })}
    </div>
  );
};

export default EmptyWord;
