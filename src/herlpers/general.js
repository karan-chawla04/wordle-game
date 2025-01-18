export function isSingleLowercaseLetter(str) {
  const regex = /^[a-z]$/;
  return regex.test(str);
}

export function getWordMatchArr(correctWord, userWord) {
  let wordArr = [];
  let correctWordMap = new Map();
  let userWordMap = new Map();

  for (let i = 0; i < userWord.length; i++) {
    const x1 = correctWord[i];
    const x2 = userWord[i];

    if (x1 === x2) {
      continue;
    }

    if (correctWordMap.has(x1)) {
      const currentCount = correctWordMap.get(x1);
      correctWordMap.set(x1, currentCount + 1);
    } else {
      correctWordMap.set(x1, 1);
    }
    if (userWordMap.has(x2)) {
      const currentCount = userWordMap.get(x2);
      userWordMap.set(x2, currentCount + 1);
    } else {
      userWordMap.set(x2, 1);
    }
  }

  for (let i = 0; i < userWord.length; i++) {
    const x1 = correctWord[i];
    const x2 = userWord[i];
    if (x1 === x2) {
      wordArr.push([x2, "green"]);
    } else {
      if (correctWordMap.has(x2) && correctWordMap.get(x2) > 0) {
        wordArr.push([x2, "yellow"]);
        correctWordMap.set(x2, correctWordMap.get(x2) - 1);
      } else {
        wordArr.push([x2, "grey"]);
      }
    }
  }

  return wordArr;
}

export const getRandomWord = async () => {
  try {
    const response = await fetch("./data/commonWords5.txt"); // Adjust the path as necessary
    const text = await response.text();
    const wordsArray = text.split("\n").filter((word) => word.length === 5); // Filter for 5-letter words
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  } catch (error) {
    console.error("Error fetching the words:", error);
    return null; // Return null or handle the error as needed
  }
};
