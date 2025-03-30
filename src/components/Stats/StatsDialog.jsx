import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SlideUp from "../../Transitions/SlideUp";
import { BarChart } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      scaleType: "band",
      dataKey: "key",
      label: "Attempts",

    },
  ],
  series: [{ dataKey: "value" }],
  layout: "horizontal",
  xAxis: [
    {
      label: "Games",
      colorMap: {
        type: 'continuous',
        min: 0,
        max: 6,
        color: ['orange', 'green']
      }
    },
  ],
  width: 520,
  height: 280,
  borderRadius: 4,
  disableAxisListener: true,
};

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
        stats.distribution = [0, 0, 0, 0, 0, 0];
        let maxStreak = 0;
        let currentStreak = 0;

        for (const game of filteredGames) {
          total += 1;
          if (game.winner === true) {
            win += 1;
            currentStreak += 1;
            if (game?.attempts <= 6) {
              console.log(game.attempts);
              stats.distribution[game.attempts - 1] += 1;
            }
          } else {
            currentStreak = 0;
          }
          maxStreak = Math.max(maxStreak, currentStreak);
        }

        stats.played = Math.round(total);
        stats.win_per = Math.round(((win / total) * 1000) / 10);
        stats.maxStreak = Math.round(maxStreak);
        stats.currentStreak = Math.round(currentStreak);
      }
      return stats;
    });
  };

  useEffect(() => {
    calculateStats();
  }, [statWindow, isOpen]);

  useEffect(() => {
    console.log(stats);
  }, [stats]);

  let dataSet = [];

  for (let i = 0; i < stats.distribution.length; i++) {
    dataSet.push({
      key: i + 1,
      value: stats.distribution[i],
    });
  }

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
            {stats.played ? (
              <>
                <div className="statsRow">
                  <div className="statsItem">
                    <div className="value">{stats.played}</div>
                    <div>Played</div>
                  </div>
                  <div className="statsItem">
                    <div className="value">{stats.win_per}</div>
                    <div>Win %</div>
                  </div>
                  <div className="statsItem">
                    <div className="value">{stats.currentStreak}</div>
                    <div>Current Streak</div>
                  </div>
                  <div className="statsItem">
                    <div className="value">{stats.maxStreak}</div>
                    <div>Max Streak</div>
                  </div>
                </div>
                <div className="statsDistribution">
                  <div>Guess Distribution</div>
                  <BarChart dataset={dataSet} {...chartSetting} />
                </div>
              </>
            ) : (
              <div className="statsMsg">No stats available yet...</div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default StatsDialog;
