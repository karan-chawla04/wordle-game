import React from "react";
import { useEffect } from "react";
import { getWordMatchArr, suggestGoodWords } from "../../helpers/general";
import { Sets } from "../../helpers/dataStructures";

const HelpBot = ({ gameState }) => {
  const findGoodWord = () => {
    const attemptedWords = gameState.attemptedWords;

    if (attemptedWords.length === 0) {
      alert("Please attempt a word to get some suggestions");
      return;
    }

    let arr = [];
    let wordArr = [null, null, null, null, null];
    let wrongPos = [null, null, null, null, null];

    const allLetters = "abcdefghijklmnopqrstuvwxyz";

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

    for (const word of attemptedWords) {
      const matchArr = getWordMatchArr(gameState.correctWord, word);
      arr.push(matchArr);
      for (let i = 0; i < matchArr.length; i++) {
        const ele = matchArr[i];
        const letter = ele[0];
        const color = ele[1];
        if (color === "green") {
          wordArr[i] = letter;
        } else if (color === "yellow") {
          if (wrongPos[i]) {
            if (!wrongPos[i].includes(letter)) wrongPos[i] += letter;
          } else {
            wrongPos[i] = letter;
          }
        }
      }
    }

    let finalPoss = [];

    for (let i = 0; i < wordArr.length; i++) {
      const correctLetter = wordArr[i];
      const wrongLetters = wrongPos[i];

      if (correctLetter) {
        finalPoss.push(correctLetter);
      } else {
        let possibleLetters = "";
        for (const x of allLetters) {
          if (wrongLetters) {
            if (!wrongLetters.includes(x) && !notInWordLetters.has(x)) {
              possibleLetters += x;
            }
          } else if (!notInWordLetters.has(x)) {
            possibleLetters += x;
          }
        }
        finalPoss.push(possibleLetters);
      }
    }
    const regexPattern = finalPoss.map((chars) => `[${chars}]`).join("");
    const regex = new RegExp(`^${regexPattern}$`);

    const goodWords = suggestGoodWords(regex);
    const randomIndex = Math.floor(Math.random() * goodWords.length);
    alert(goodWords[randomIndex]);
  };

  return (
    <>
      <button
        style={{
          textDecoration: "underline",
        }}
        onClick={findGoodWord}
      >
        Suggest word
      </button>
    </>
  );
};

export default HelpBot;
