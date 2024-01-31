export const Age = (Birthday) => {
  console.info("Birthday = "+ Birthday);
  const isValidDate = !isNaN(new Date(Birthday).getTime());
  if (!isValidDate) {
    return "Date invalide";
  }
  const BirthdayDate = new Date(Birthday);
  const DDay = new Date();
  let userAge = DDay.getUTCFullYear() - BirthdayDate.getUTCFullYear();
  const noBirthday =
    DDay.getUTCMonth() > BirthdayDate.getUTCMonth() ||
    (DDay.getUTCMonth() === BirthdayDate.getUTCMonth() &&
      DDay.getUTCDate() >= BirthdayDate.getUTCDate());

  if (!noBirthday) {
    const isBirthdayToday =
      DDay.getUTCMonth() === BirthdayDate.getUTCMonth() &&
      DDay.getUTCDate() === BirthdayDate.getUTCDate();
    if (!isBirthdayToday) {
      userAge -= 1;
    }
  }
  return userAge;
};


export const getUserData = async (id) => {
  // connect to the server to retrieve user data
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data, "response getUserData");
    return data.userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
