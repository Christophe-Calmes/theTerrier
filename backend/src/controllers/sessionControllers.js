const models = require("../models");

const logIn = (req, res) => {
    const userData = req.body
    // console.log(userData);   

    models.user
    .find(2)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        // user trouvé
        const user = rows[0]

        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
    logIn,
}