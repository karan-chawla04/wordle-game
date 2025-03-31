import React from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import SlideUp from "../../Transitions/SlideUp";
import { GitHub, LinkedIn, Web } from "@mui/icons-material";

const AboutDialog = ({ isOpen, onClose }) => {
  const sendToPage = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={SlideUp}
    >
      <div className="aboutContainer">
        <div className="aboutHead">
          <div className="aboutHeader">About</div>
          <button onClick={onClose} className="aboutClose">
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <div className="innerAbout">
          <div className="aboutContent" style={{ fontWeight: 600 }}>
            Developed by:{" "}
            <a href="https://karanchawla.in" target="_blank">
              Karan Chawla
            </a>{" "}
            (karan.chawla.04.11.98@gmail.com)
          </div>
          <div className="aboutButtonHolder">
            <button
              onClick={() => {
                sendToPage("https://karanchawla.in");
              }}
            >
              <Web />
              To my Website
            </button>
            <button
              onClick={() => {
                sendToPage("https://github.com/karan-chawla04");
              }}
            >
              <GitHub />
              Github Profile
            </button>
            <button
              onClick={() => {
                sendToPage(
                  "https://www.linkedin.com/in/karan-chawla-815589199/"
                );
              }}
            >
              <LinkedIn />
              LinkedIn Profile
            </button>
          </div>

          <div className="aboutContent">
            This game was developed as a copy of the New York Times Wordle game,
            please play and support the original game at their official website.
          </div>
          <div className="aboutContent">
            It is a front end only application which doesn't collect any user
            data. Any past game data used for statistics are stored in the users
            browser only.
          </div>
          <div className="aboutContent">
            The code base is open source and can be found in my git hub profile.
          </div>
          <div className="aboutContent">
            Tech Stack:
            <ul>
              <li>React JS</li>
              <li>Material UI</li>
              <li>HTML 5</li>
              <li>CSS 3</li>
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AboutDialog;
