const argon2 = require('argon2');
const models = require("../models");

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  try {
    models.user.findByEmail(req.body.email).then(async ([rows]) => {
      if (rows[0] === null) {
        res.sendStatus(404);
      } else {
        const passwordHash = rows[0].password;
        console.info(passwordHash);
        const verifiedUser = await argon2.verify(passwordHash, password);
        if (verifiedUser) {
          next();
        } else {
          res.status(401).send("Auth fail !");
        }
      }
    });
  } catch (err) {
    res.status(500).send("Auth fail !");
  }
};

module.exports = verifyPassword;
