import React from "react";
import "./style.css";
import { Sets } from "../../herlpers/dataStructures";

const VirtualKeyboard = ({ gameState, handleGameUpdate }) => {
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "b.space"];
  const row3 = ["z", "x", "c", "v", "b", "n", "m", "enter"];

  let userUsedLetters = new Set();
  let correctWordLetters = new Set();

  for (const char of gameState.correctWord) {
    correctWordLetters.add(char);
  }

  for (const userPrevAns of gameState.attemptedWords) {
    for (const char of userPrevAns) {
      userUsedLetters.add(char);
    }
  }

  let notInWordLetters = Sets.setDifference(
    userUsedLetters,
    correctWordLetters
  );

  const handleKeyPress = (key) => {
    if (key === "b.space") {
      key = "backspace";
    }
    handleGameUpdate(key);
  };

  return (
    <div className="keyboardContainer">
      <div className="keyboardRow">
        {row1.map((key, index) => {
          const block = notInWordLetters.has(key) ? "block" : null;
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className={`keyboardKey ${block}`}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row2.map((key, index) => {
          const block = notInWordLetters.has(key) ? "block" : null;
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className={`keyboardKey ${block}`}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row3.map((key, index) => {
          const block = notInWordLetters.has(key) ? "block" : null;
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className={`keyboardKey ${block}`}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
