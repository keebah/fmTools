export const sortByTotalScore = (
  a: { totalScore: number },
  b: { totalScore: number }
) => {
  if (a.totalScore > b.totalScore) {
    return -1;
  }
  return 1;
};
