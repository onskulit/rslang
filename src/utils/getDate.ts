export const getCurrentDate = () => {
  const data = new Date();
  return `${data.getDay()}${data.getMonth()}${data.getFullYear()}`;
};
