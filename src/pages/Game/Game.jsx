import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import EmptyWord from "../../components/EmptyWord/EmptyWord";
import VirtualKeyboard from "../../components/VirtualKeyboard/VirtualKeyboard";
import "./style.css";
import { isSingleLowercaseLetter } from "../../herlpers/general";

const Game = () => {
  const correctWord = "karan";

  const [gameState, setGameState] = useState({
    correctWord: correctWord,
    attemptsRemains: 6,
    attemptedWords: [],
    currentWord: "",
  });

  const handleKey = (event) => {
    let key = event.key.toLowerCase();
    handleGameUpdate(key);
  };

  const handleGameUpdate = (key) => {
    if (isSingleLowercaseLetter(key)) {
      setGameState((prevGameState) => {
        let gameState = { ...prevGameState };
        if (gameState.currentWord.length < 5) {
          gameState.currentWord = gameState.currentWord + key;
        }
        return gameState;
      });
    }

    if (key === "backspace") {
      setGameState((prevGameState) => {
        let gameState = { ...prevGameState };
        gameState.currentWord = gameState.currentWord.slice(0, -1);
        return gameState;
      });
    }

    if (key === "enter") {
      setGameState((prevGameState) => {
        let gameState = { ...prevGameState };
        if (gameState.currentWord.length === 5) {
          if (gameState.currentWord === correctWord) {
          }
          gameState.attemptedWords.push(gameState.currentWord);
          gameState.currentWord = "";
          gameState.attemptsRemains = gameState.attemptsRemains - 1;
        }
        return gameState;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  return (
    <>
      <Header />
      <div className="GameArea">
        {gameState && (
          <>
            {gameState.attemptedWords.map((attemptedWord, index) => {
              if (index % 2 === 0) {
                return (
                  <EmptyWord
                    userWord={attemptedWord}
                    key={index}
                    correctWord={correctWord}
                  />
                );
              } else {
                return null;
              }
            })}
            <EmptyWord userWord={gameState.currentWord} />
            {Array.from(
              { length: gameState.attemptsRemains - 1 },
              (_, index) => {
                return <EmptyWord key={index} userWord="" />;
              }
            )}
          </>
        )}
      </div>
      <div className="KeyboardArea">
        <VirtualKeyboard
          gameState={gameState}
          handleGameUpdate={handleGameUpdate}
        />
      </div>
    </>
  );
};

export default Game;
