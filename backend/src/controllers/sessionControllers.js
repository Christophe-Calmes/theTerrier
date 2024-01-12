const models = require("../models");

const logIn = (req, res) => {
  const userData = req.body;
  models.user
    .findByEmail(userData.email)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        // user trouvé
        const user = rows[0]
        // console.log(user)

        if (userData.password === user.password) {
          delete user.password;
          res.send(user);
        } else {
          res.sendStatus(400);
        }

        // res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    });
};

module.exports = {
  logIn,
};
