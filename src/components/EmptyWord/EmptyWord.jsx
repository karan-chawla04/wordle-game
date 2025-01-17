import React from "react";
import { useState, useEffect } from "react";
import "./style.css";

const EmptyWord = ({ isActive, userWord, submitted }) => {
  const arr = [0, 1, 2, 3, 4];

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
          return (
            <div key={i} className={`emptyLetterBox`}>
              {userWord[i]}
            </div>
          );
        }
      })}

      {/* {userWord.length >= 0 && (
        <>
          <div className={`emptyLetterBox`}>{userWord[0] || ""}</div>
          <div className={`emptyLetterBox`}>{userWord[1] || ""}</div>
          <div className={`emptyLetterBox`}>{userWord[2] || ""}</div>
          <div className={`emptyLetterBox`}>{userWord[3] || ""}</div>
          <div className={`emptyLetterBox`}>{userWord[4] || ""}</div>
        </>
      )} */}
    </div>
  );
};

export default EmptyWord;
