import React from "react";

const MobileKeyboard = ({ handleKeyPress, gameOver, notInWordLetters }) => {
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "bs"];
  const row3 = [, "z", "x", "c", "v", "b", "n", "m", "enter"];

  return (
    <div className="mobileKeyboardContainer">
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

export default MobileKeyboard;
