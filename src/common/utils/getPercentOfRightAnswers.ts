export const getPercentOfRightAnswers = (right: number, wrong: number) => {
  return Math.round((right / (right + wrong)) * 100);
};
