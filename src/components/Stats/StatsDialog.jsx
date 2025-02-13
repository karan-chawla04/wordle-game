import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SlideUp from "../../Transitions/SlideUp";

const StatsDialog = ({ isOpen, onClose }) => {
  const [statWindow, setStatWindow] = useState("normal");
  const [stats, setStats] = useState({
    played: 0,
    win_per: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: [0, 0, 0, 0, 0, 0],
  });

  const openNormal = () => {
    setStatWindow("normal");
  };
  const openHard = () => {
    setStatWindow("hard");
  };

  const calculateStats = () => {
    setStats((prevStats) => {
      let stats = { ...prevStats };
      const pastGames = localStorage.getItem("pastGames");
      if (pastGames) {
        let pastGamesArr = JSON.parse(pastGames);
        const filteredGames = pastGamesArr.filter(
          (item) => item.mode === statWindow
        );
        let total = 0;
        let win = 0;
        for (const game of filteredGames) {
          total += 1;
          if (game.winner === true) {
            win += 1;
          }
        }

        stats.played = total;
        stats.win_per = (win / total) * 100;
      }
      return stats;
    });
  };

  useEffect(() => {
    calculateStats();
  }, [statWindow, isOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      TransitionComponent={SlideUp}
    >
      <div className="statsContainer">
        <div className="statsHeader">
          <div>Statistics</div>
          <button onClick={onClose} className="statsClose">
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <div className="statsHolder">
          <div className="statsNav">
            <button
              onClick={openNormal}
              className={statWindow === "normal" ? "active first" : "first"}
            >
              Normal Mode
            </button>
            <button
              onClick={openHard}
              className={statWindow === "hard" ? "active last" : "last"}
            >
              Hard Mode
            </button>
          </div>
          <div className="statsBody">
            played: {stats.played}
            <br />
            win percent: {stats.win_per}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default StatsDialog;
