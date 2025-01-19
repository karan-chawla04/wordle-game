import React from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameOverDialog = ({ isOpen, gameState, gameReset }) => {
  return (
    <Dialog open={isOpen} maxWidth="md" TransitionComponent={Transition}>
      <div className="gameOverContainer">
        {gameState.winner ? (
          <div className="gameWinner">
            <h1>Winner</h1>
            <h2>
              {gameState.attemptsRemains === 5
                ? "You are crerly very lucky"
                : gameState.attemptsRemains === 4
                ? "Wow, I am shocked!!"
                : gameState.attemptsRemains === 3
                ? "Wow, You are really good!"
                : gameState.attemptsRemains === 2
                ? "Nice Win"
                : gameState.attemptsRemains === 1
                ? "Not bad"
                : "Phew, barely made it!"}
            </h2>
          </div>
        ) : (
          <div className="gameLoser">You couldn't guess in 6 tries</div>
        )}
      </div>

      <button className="gameOverClose">
        <CloseIcon fontSize="large" />
      </button>
    </Dialog>
  );
};

export default GameOverDialog;
