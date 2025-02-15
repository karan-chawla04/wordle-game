import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import EmptyWord from "../../components/EmptyWord/EmptyWord";
import VirtualKeyboard from "../../components/VirtualKeyboard/VirtualKeyboard";
import "./style.css";
import {
  isSingleLowercaseLetter,
  getRandomWord,
  getRandomHardWord,
  checkWordExistence,
} from "../../helpers/general";
import GameOverDialog from "../../components/GameOver/GameOverDialog";
import HelpBot from "../../components/HelpBot/HelpBot";

const Game = () => {
  const [correctWord, setCorrectWord] = useState("");
  const [gameState, setGameState] = useState({
    correctWord: correctWord,
    attemptsRemains: 6,
    attemptedWords: [],
    currentWord: "",
    winner: false,
    mode: "normal",
  });
  const [vibrateWord, setVibrateWord] = useState(false);
  const [openGameOver, setOpenGameOver] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const toggleGameOver = () => {
    setOpenGameOver(!openGameOver);
  };

  const saveGame = (winner) => {
    const pastGames = localStorage.getItem("pastGames");
    const currentGame = {
      word: gameState.correctWord,
      winner: winner,
      attempts: 6 - gameState.attemptsRemains,
      mode: gameState.mode,
    };
    if (pastGames) {
      let pastGamesArr = JSON.parse(pastGames);
      pastGamesArr.push(currentGame);
      localStorage.setItem("pastGames", JSON.stringify(pastGamesArr));
    } else {
      let pastGamesArr = [currentGame];
      localStorage.setItem("pastGames", JSON.stringify(pastGamesArr));
    }
  };

  const performVibration = () => {
    setVibrateWord(true);
    setTimeout(() => {
      setVibrateWord(false);
    }, 400);
  };

  const fetchWord = (mode) => {
    try {
      let randomWord;
      if (mode === "hard") {
        randomWord = getRandomHardWord();
        setCorrectWord(randomWord);
        setGameState((prevGameState) => {
          let gameState = { ...prevGameState };
          gameState.correctWord = randomWord;
          gameState.mode = "hard";
          return gameState;
        });
      } else {
        randomWord = getRandomWord();
        setCorrectWord(randomWord);
        setGameState((prevGameState) => {
          let gameState = { ...prevGameState };
          gameState.correctWord = randomWord;
          gameState.mode = "normal";
          return gameState;
        });
      }
    } catch (error) {
      console.error("Error fetching the words:", error);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const resetGame = (mode = "normal") => {
    setGameState({
      correctWord: "",
      attemptsRemains: 6,
      attemptedWords: [],
      currentWord: "",
      winner: false,
    });
    fetchWord(mode);
    setOpenGameOver(false);
    setGameCompleted(false);
  };

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
    if (gameState.attemptedWords.length > 0) {
      const len = gameState.attemptedWords.length;
      const lastGuess = gameState.attemptedWords[len - 1];
      if (!gameState.winner && lastGuess === gameState.correctWord) {
        setGameState((prevGameState) => {
          let gameState = { ...prevGameState };
          gameState.winner = true;
          return gameState;
        });
        saveGame(true);
        setTimeout(() => {
          setOpenGameOver(true);
        }, 1500);
        setTimeout(() => {
          setGameCompleted(true);
        }, 1600);
      } else if (gameState.attemptsRemains === 0) {
        saveGame(false);
        setTimeout(() => {
          setOpenGameOver(true);
        }, 1500);
        setTimeout(() => {
          setGameCompleted(true);
        }, 1600);
      }
    }
  }, [gameState]);

  return (
    <>
      <Header />
      <HelpBot gameState={gameState} />
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

        {gameCompleted && (
          <div onClick={toggleGameOver} className="gameLink">
            {gameState.winner
              ? "You won, open game summary"
              : "You lost, open game summary"}
          </div>
        )}
      </div>
      <div className="KeyboardArea">
        <VirtualKeyboard
          gameState={gameState}
          handleGameUpdate={handleGameUpdate}
        />
      </div>
      <GameOverDialog
        isOpen={openGameOver}
        gameState={gameState}
        onClose={toggleGameOver}
        resetGame={resetGame}
      />
    </>
  );
};

export default Game;
