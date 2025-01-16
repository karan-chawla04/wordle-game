import React from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

const HowToPlayDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <div className="htpContainer">
        <button onClick={onClose} className="htpClose">
          <CloseIcon fontSize="large" />
        </button>
      </div>
    </Dialog>
  );
};

export default HowToPlayDialog;
