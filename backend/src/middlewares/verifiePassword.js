const argon2 = require('argon2');
const models = require("../models");

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;
  
  try {
    const [[dataDB]] = await models.user.findByEmail(req.body.email);
    const verifiedUser = await argon2.verify(dataDB.password, password);
    console.info(verifiedUser);
    if(verifiedUser) {
      next();
    } else {
      res.status(401).send("It's very bad bad password ! Coquinou...");
    }

  }catch (err) {
    res.status(500).send("Auth fail !");
  }
};

module.exports = verifyPassword;
