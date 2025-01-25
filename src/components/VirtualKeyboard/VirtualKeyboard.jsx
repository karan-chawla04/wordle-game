import React from "react";
import "./style.css";
import { Sets } from "../../helpers/dataStructures";
import PCKeyboard from "./PCKeyboard";
import MobileKeyboard from "./MobileKeyboard";

const VirtualKeyboard = ({ gameState, handleGameUpdate }) => {
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
    if (key === "b.space" || key === "bs") {
      key = "backspace";
    }
    handleGameUpdate(key);
  };

  return (
    <>
      <PCKeyboard
        handleKeyPress={handleKeyPress}
        notInWordLetters={notInWordLetters}
      />
      {/* <MobileKeyboard
        handleKeyPress={handleKeyPress}
        notInWordLetters={notInWordLetters}
      /> */}
    </>
  );
};

export default VirtualKeyboard;
