import React from "react";
import "./style.css";

const VirtualKeyboard = ({ gameState, correctWord, handleGameUpdate }) => {
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "b.space"];
  const row3 = ["z", "x", "c", "v", "b", "n", "m", "enter"];

  const handleKeyPress = (key) => {
    if (key === "b.space") {
      key = "backspace";
    }
    console.log("Key Pressed on virtual keyboard: ", key);
    handleGameUpdate(key);
  };

  return (
    <div className="keyboardContainer">
      <div className="keyboardRow">
        {row1.map((key, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className="keyboardKey"
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row2.map((key, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className="keyboardKey"
            >
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row3.map((key, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                handleKeyPress(key);
              }}
              className="keyboardKey"
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
