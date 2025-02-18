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
    let yellowMapArr = [];
    let greenMapArr = [];

    for (const word of attemptedWords) {
      const matchArr = getWordMatchArr(gameState.correctWord, word);
      arr.push(matchArr);

      let yellowMap = new Map();
      let greenMap = new Map();

      for (const letter of allLetters) {
        yellowMap.set(letter, 0);
        greenMap.set(letter, 0);
      }

      for (let i = 0; i < matchArr.length; i++) {
        const ele = matchArr[i];
        const letter = ele[0];
        const color = ele[1];

        if (color === "green") {
          wordArr[i] = letter;
          greenMap.set(letter, greenMap.get(letter) + 1);
          yellowMap.set(letter, yellowMap.get(letter) + 1);
        } else if (color === "yellow" || color === "grey") {
          if (wrongPos[i]) {
            if (!wrongPos[i].includes(letter)) wrongPos[i] += letter;
          } else {
            wrongPos[i] = letter;
          }

          if (color === "yellow") {
            yellowMap.set(letter, yellowMap.get(letter) + 1);
          }
        }
      }
      // for (let i = 0; i < matchArr.length; i++) {
      //   const ele = matchArr[i];
      //   const letter = ele[0];
      //   const color = ele[1];

      //   if (color === "yellow") {
      //     yellowMap.set(letter, yellowMap.get(letter) + 1);
      //   }
      // }
      yellowMapArr.push(yellowMap);
      greenMapArr.push(greenMap);
    }

    let yellowMaxMap = new Map();
    let greenMaxMap = new Map();

    for (const letter of allLetters) {
      yellowMaxMap.set(letter, 0);
      greenMaxMap.set(letter, 0);
    }

    for (const letter of allLetters) {
      for (let i = 0; i < yellowMapArr.length; i++) {
        const currYellowMax = yellowMaxMap.get(letter);
        const currGreenMax = greenMaxMap.get(letter);

        if (currYellowMax < yellowMapArr[i].get(letter)) {
          yellowMaxMap.set(letter, yellowMapArr[i].get(letter));
        }
        if (currGreenMax < greenMapArr[i].get(letter)) {
          greenMaxMap.set(letter, greenMapArr[i].get(letter));
        }
      }
    }

    let possibleExtraLetters = [];

    for (const letter of allLetters) {
      if (yellowMaxMap.get(letter) > greenMaxMap.get(letter)) {
        possibleExtraLetters.push(letter);
      }
    }

    let letterMap = new Map();

    for (const letter of allLetters) {
      const green = wordArr.includes(letter) ? 1 : 0;
      const yellow = possibleExtraLetters.includes(letter) ? 1 : 0;
      letterMap.set(letter, green + yellow);
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

    const goodWords = suggestGoodWords(regex, letterMap);
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
