import React from "react";
import { Dialog } from "@mui/material";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameOverDialog = ({ isOpen, gameState, gameReset }) => {
  return (
    <Dialog open={isOpen} maxWidth="md" TransitionComponent={Transition}>
      Game Over
    </Dialog>
  );
};

export default GameOverDialog;
