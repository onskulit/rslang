export const getCurrentDate = () => {
  const data = new Date();
  const day =
    data.getDate().toString().length === 1
      ? `0${data.getDate()}`
      : `${data.getDate()}`;
  const month =
    data.getMonth().toString().length === 1
      ? `0${data.getMonth() + 1}`
      : `${data.getMonth() + 1}`;
  return `${day}.${month}.${data.getFullYear()}`;
};
