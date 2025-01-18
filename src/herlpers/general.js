export function isSingleLowercaseLetter(str) {
  const regex = /^[a-z]$/;
  return regex.test(str);
}

export function getWordMatchArr(correctWord, userWord) {
  let wordArr = [];
  let correctWordMap = new Map();

  for (let i = 0; i < correctWord.length; i++) {
    const x = correctWord[i];
    if (correctWordMap.has(x)) {
      const currentCount = correctWordMap.get(x);
      correctWordMap.set(x, currentCount + 1);
    } else {
      correctWordMap.set(x, 1);
    }
  }
  console.log(correctWordMap);

  for (let i = 0; i < userWord.length; i++) {
    const x = userWord[i];
    if (x === correctWord[i]) {
      wordArr.push([x, "green"]);
      correctWordMap.set(x, correctWordMap.get(x) - 1);
    } else {
      if (correctWordMap.has(x) && correctWordMap.get(x) > 0) {
        wordArr.push([x, "yellow"]);
        correctWordMap.set(x, correctWordMap.get(x) - 1);
      } else {
        wordArr.push([x, "grey"]);
      }
    }
  }

  return wordArr;
}
