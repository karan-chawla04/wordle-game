import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import { getWordMatchArr } from "../../herlpers/general";

const EmptyWord = ({ isActive, userWord, submitted, correctWord }) => {
  const arr = [0, 1, 2, 3, 4];

  let matchArr = [];
  if (submitted) {
    matchArr = getWordMatchArr(correctWord, userWord);
    console.log(matchArr);
  }

  return (
    <div className="emptyWordHolder">
      {arr.map((i) => {
        if (userWord.length <= i) {
          return (
            <div key={i} className={`emptyLetterBox`}>
              {""}
            </div>
          );
        } else {
          if (submitted && matchArr && matchArr.length > 0) {
            return (
              <div key={i} className={`emptyLetterBox ${matchArr[i][1]}`}>
                {userWord[i]}
              </div>
            );
          }

          return (
            <div
              key={i}
              className={`emptyLetterBox ${submitted && "submitted"}`}
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
