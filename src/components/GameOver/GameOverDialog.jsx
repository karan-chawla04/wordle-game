import React from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";
import "./style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameOverDialog = ({ isOpen, gameState, gameReset }) => {
  return (
    <Dialog open={isOpen} maxWidth="md" TransitionComponent={Transition}>
      <div className="gameOverContainer">
        {gameState.winner ? (
          <div className="gameWinner">You are the winner</div>
        ) : (
          <div className="gameLoser">You couldn't guess in 6 tries</div>
        )}
      </div>
    </Dialog>
  );
};

export default GameOverDialog;
