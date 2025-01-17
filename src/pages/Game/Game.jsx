import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import EmptyWord from "../../components/EmptyWord/EmptyWord";
import "./style.css";

function isSingleLowercaseLetter(str) {
  const regex = /^[a-z]$/;
  return regex.test(str);
}

const Game = () => {
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [userWord, setUserWord] = useState("");
  const [attemptedWords, setAttemptedWords] = useState([]);

  const handleKey = (event) => {
    let key = event.key.toLowerCase();

    console.log(`You pressed a letter: ${key}`);

    if (isSingleLowercaseLetter(key)) {
      setUserWord((prevUserWord) => {
        if (prevUserWord.length < 5) {
          console.log(prevUserWord);
          return prevUserWord + key;
        }
        return prevUserWord;
      });
    }

    if (key === "backspace") {
      setUserWord((prevUserWord) => prevUserWord.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="GameArea">
        <div>
          <EmptyWord userWord={userWord} isActive={attemptNumber === 1} />
          <EmptyWord userWord={userWord} isActive={attemptNumber === 2} />
          <EmptyWord userWord={userWord} isActive={attemptNumber === 3} />
          <EmptyWord userWord={userWord} isActive={attemptNumber === 4} />
          <EmptyWord userWord={userWord} isActive={attemptNumber === 5} />
          <EmptyWord userWord={userWord} isActive={attemptNumber === 6} />
        </div>
      </div>
    </>
  );
};

export default Game;
