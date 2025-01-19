export const Sets = {
  setDifference: (setA, setB) => {
    const result = new Set();
    for (let item of setA) {
      if (!setB.has(item)) {
        result.add(item);
      }
    }
    return result;
  },
};
