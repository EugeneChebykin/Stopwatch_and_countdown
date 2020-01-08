const formatDate = date => {
  const milliSec = `00${new Date(date).getMilliseconds()}`.slice(-3);
  const sec = `0${new Date(date).getSeconds()}`.slice(-2);
  const min = `0${new Date(date).getMinutes()}`.slice(-2);
  const hour = `0${new Date(date).getUTCHours()}`.slice(-2);
  return `${hour}:${min}:${sec}.${milliSec}`;
};
export default formatDate;
