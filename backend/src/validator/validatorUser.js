const {
  sizeFields,
  isEmailValid,
  adultVerified,
  isPasswordValid,
} = require("./validatorFields");

const validatorUser = (req, res, next) => {
  const errors = {};
  const { username, city, password, email, role_id, valid, birthday_date } =
    req.body;
  if (!sizeFields(email, 60, 7)) {
    errors.emailSize = `Email size errors`;
  }
  if (isEmailValid(email) !== true) {
    errors.emailValid = "Email format is not valid";
  }
  if (!sizeFields(username, 30, 4)) {
    errors.usernameSize = "Username size errors";
  }
  if (!sizeFields(city, 40, 1)) {
    errors.city = "City name size errors";
  }
  if (!sizeFields(password, 12, 4)) {
    errors.password = "Errors password size";
  }
  if (!adultVerified(birthday_date, 18)) {
    errors.adult = "Adult only";
  }
  if (!isPasswordValid(password)) {
    errors.password = "Password invalid";
  }
  if (Object.keys(errors).length === 0) {
    next();
  } else {
    res.status(422).send(errors);
  }
};

module.exports = validatorUser;
