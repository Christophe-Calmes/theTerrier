const sizeFields = (data, targetSizeMax, targetSizeMin) => {
  if (data.length < targetSizeMax) {
    if (data.length > targetSizeMin) {
      return true;
    }
  }
  return false;
};
const isEmailValid = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};
const adultVerified = (date, age) => {
  const years18 = age * 365 * 24 * 3600;
  const birthdayDate = Date.parse(date);
  const nowTimeStamp = Date.now();
  const intervalleTime = (nowTimeStamp - birthdayDate)/1000;
  if (intervalleTime > years18) {
    return true;
  }
  return false;
};
module.exports = { sizeFields, isEmailValid, adultVerified };
