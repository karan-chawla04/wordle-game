import React from "react";
import "./style.css";

const VirtualKeyboard = () => {
  const row1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const row2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "b.space"];
  const row3 = ["z", "x", "c", "v", "b", "n", "m", "enter"];

  return (
    <div className="keyboardContainer">
      <div className="keyboardRow">
        {row1.map((key, index) => {
          return (
            <button key={index} className="keyboardKey">
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row2.map((key, index) => {
          return (
            <button key={index} className="keyboardKey">
              {key}
            </button>
          );
        })}
      </div>
      <div className="keyboardRow">
        {row3.map((key, index) => {
          return (
            <button key={index} className="keyboardKey">
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
