const argon2 = require('argon2');
const models = require("../models");

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const [[dataDB]] = await models.user.findByEmail(req.body.email);
    const verifiedUser = await argon2.verify(dataDB.password, password);
    if (verifiedUser) {
      delete req.body.password;
      const { id, role_id } = dataDB;
      
      req.body.id = id;
      req.body.role_id = role_id;
      next();
    } else {
      res.status(401).send("It's very bad bad password !");
    }
  } catch (err) {
    res.status(500).send("Auth fail !");
  }
};

module.exports = verifyPassword;
