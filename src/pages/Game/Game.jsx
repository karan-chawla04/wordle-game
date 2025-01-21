import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import EmptyWord from "../../components/EmptyWord/EmptyWord";
import VirtualKeyboard from "../../components/VirtualKeyboard/VirtualKeyboard";
import "./style.css";
import {
  isSingleLowercaseLetter,
  getRandomWord,
  checkWordExistence,
} from "../../helpers/general";
import GameOverDialog from "../../components/GameOver/GameOverDialog";

const Game = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [gameState, setGameState] = useState({
    correctWord: correctWord,
    attemptsRemains: 6,
    attemptedWords: [],
    currentWord: "",
    winner: false,
  });
  const [vibrateWord, setVibrateWord] = useState(false);
  const [openGameOver, setOpenGameOver] = useState(false);

  const performVibration = () => {
    setVibrateWord(true);
    setTimeout(() => {
      setVibrateWord(false);
    }, 400);
  };

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const randomWord = getRandomWord();
        setCorrectWord(randomWord);
        setGameState((prevGameState) => {
          let gameState = { ...prevGameState };
          gameState.correctWord = randomWord;
          return gameState;
        });
      } catch (error) {
        console.error("Error fetching the words:", error);
      }
    };

    fetchWords();
  }, []);

  const handleKey = (event) => {
    let key = event.key.toLowerCase();
    if (key === "enter" || key === "backspace") {
      event.preventDefault();
    }
    handleGameUpdate(key);
  };

  const handleGameUpdate = (key) => {
    if (isSingleLowercaseLetter(key)) {
      setGameState((prevGameState) => {
        let gameState = { ...prevGameState };
        if (gameState.attemptsRemains <= 0 || gameState.winner) {
          return gameState;
        }
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
        if (gameState.attemptsRemains <= 0 || gameState.winner) {
          return gameState;
        }
        if (gameState.currentWord.length === 5) {
          if (checkWordExistence(gameState.currentWord)) {
            gameState.attemptedWords.push(gameState.currentWord);
            gameState.currentWord = "";
            gameState.attemptsRemains = gameState.attemptsRemains - 1;
          } else {
            performVibration();
          }
        } else {
          performVibration();
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
    if (gameState.attemptedWords.length > 0) {
      const len = gameState.attemptedWords.length;
      const lastGuess = gameState.attemptedWords[len - 1];
      if (!gameState.winner && lastGuess === gameState.correctWord) {
        setGameState((prevGameState) => {
          let gameState = { ...prevGameState };
          gameState.winner = true;
          return gameState;
        });
        setTimeout(() => {
          setOpenGameOver(true);
        }, 1500);
      } else if (gameState.attemptsRemains === 0) {
        setTimeout(() => {
          setOpenGameOver(true);
        }, 1500);
      }
    }
  }, [gameState]);

  return (
    <>
      <Header />
      <div className="GameArea">
        {gameState && (
          <>
            {gameState.attemptedWords.map((attemptedWord, index) => {
              const numberOfAttempts = 6 - gameState.attemptsRemains;
              if (gameState.attemptedWords.length === 2 * numberOfAttempts) {
                if (index % 2 === 0) {
                  return (
                    <EmptyWord
                      userWord={attemptedWord}
                      key={index}
                      submitted={true}
                      correctWord={correctWord}
                    />
                  );
                } else {
                  return null;
                }
              } else {
                return (
                  <EmptyWord
                    userWord={attemptedWord}
                    key={index}
                    submitted={true}
                    correctWord={correctWord}
                  />
                );
              }
            })}
            {!!gameState.attemptsRemains && (
              <>
                <EmptyWord
                  userWord={gameState.currentWord}
                  shake={vibrateWord}
                />
                {Array.from(
                  { length: gameState.attemptsRemains - 1 },
                  (_, index) => {
                    return <EmptyWord key={index} userWord="" />;
                  }
                )}
              </>
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
      <GameOverDialog isOpen={openGameOver} gameState={gameState} />
    </>
  );
};

export default Game;
