const models = require("../models");

const logIn = (req, res) => {
  const userData = req.body;
  console.info(userData);
  res.status(200).send('Connected');

};

module.exports = {
  logIn,
};
