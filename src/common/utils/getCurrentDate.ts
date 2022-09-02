export const getCurrentDate = () => {
  const data = new Date();
  return `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}`;
};
