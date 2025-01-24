import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import GameWord from "../GameWord/GameWord";
import HiddenGameWord from "../HiddenGameWord/HiddenGameWord";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameOverDialog = ({ isOpen, gameState, resetGame, onClose }) => {
  const navigate = useNavigate();
  const [revealWord, setRevealWord] = useState(false);

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      TransitionComponent={Transition}
      onClose={onClose}
    >
      <div className="gameOverContainer">
        {gameState.winner ? (
          <div className="gameWinner">
            <h2>Winner</h2>
            <h4>
              {gameState.attemptsRemains === 5
                ? "You are clearly very lucky,"
                : gameState.attemptsRemains === 4
                ? "Wow, I am shocked!!"
                : gameState.attemptsRemains === 3
                ? "Wow, You are really good!"
                : gameState.attemptsRemains === 2
                ? "Nice Win,"
                : gameState.attemptsRemains === 1
                ? "Not bad,"
                : "Phew, barely made it!"}{" "}
              You guessed the word in {`${6 - gameState.attemptsRemains}`}{" "}
              tries.
            </h4>
            <GameWord
              userWord={gameState.correctWord}
              correctWord={gameState.correctWord}
            />
          </div>
        ) : (
          <div className="gameLoser">
            <h2>Ohh...</h2>
            <h4>You couldn't guess the word</h4>
            {revealWord ? (
              <GameWord
                userWord={gameState.correctWord}
                correctWord={gameState.correctWord}
              />
            ) : (
              <>
                <HiddenGameWord
                  word={gameState.correctWord}
                  reveal={() => {
                    setRevealWord(true);
                  }}
                />
              </>
            )}
          </div>
        )}

        <div className="gameOverNav">
          <h4>
            {gameState.winner
              ? "Is this too easy for you? You should try with hard word."
              : "Dont feel bad, you should try again with a differnt word."}
          </h4>
          <div className="navButtonHolder">
            <button
              className="navButton main"
              onClick={() => {
                setRevealWord(false);
                resetGame("normal");
              }}
            >
              Play Again
            </button>
            <button
              className="navButton main"
              onClick={() => {
                setRevealWord(false);
                resetGame("hard");
              }}
            >
              Play Again (Hard Word)
            </button>
            <button className="navButton" onClick={navigateHome}>
              Home
            </button>
            <button className="navButton" onClick={navigateHome}>
              Share Game
            </button>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="gameOverClose">
        <CloseIcon fontSize="large" />
      </button>
    </Dialog>
  );
};

export default GameOverDialog;
