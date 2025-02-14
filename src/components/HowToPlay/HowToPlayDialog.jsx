import React from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import GameWord from "../GameWord/GameWord";
import SlideUp from "../../Transitions/SlideUp";

const HowToPlayDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={SlideUp}
    >
      <div className="htpContainer">
        <div className="htpHead">
          <div className="htpHeader">How to Play</div>
          <button onClick={onClose} className="htpClose">
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <div className="innerHtp">
          <div>
            <div className="htpContent">Guess the Word in 6 tries.</div>
          </div>
          <div className="htpContent">
            <ul>
              <li>Each guess must be a valid 5-letter word.</li>
              <li>
                The color of the tiles will change to show how close your guess
                was to the word.
              </li>
            </ul>
          </div>
          <div className="htpContent">
            <strong>Examples</strong>
          </div>
          <div className="htpContent">
            <GameWord userWord={"wordy"} correctWord={"waaaa"} />
            <strong>W</strong> is in the word and in the correct spot.
          </div>
          <div className="htpContent">
            <GameWord userWord={"light"} correctWord={"iaaaa"} />
            <strong>I</strong> is in the word but in the wrong spot.
          </div>
          <div className="htpContent">
            <GameWord
              custom={true}
              userWord={"rogue"}
              colors={["white", "white", "white", "grey", "white"]}
            />
            <strong>U</strong> is not in the word in any spot.
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HowToPlayDialog;
