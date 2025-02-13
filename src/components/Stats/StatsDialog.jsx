import React from "react";
import "./style.css";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SlideUp from "../../Transitions/SlideUp";

const StatsDialog = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={SlideUp}
    >
      Empty dialog box
    </Dialog>
  );
};

export default StatsDialog;
