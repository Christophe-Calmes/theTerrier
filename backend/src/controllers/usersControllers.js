const models = require("../models");

const getAll = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const refeshUserById = (req, res) => {
  console.log(req.userAuth.id, "refeshUserById");
  const userId = req.userAuth.id;
  models.user
    .findUser(userId)
    .then(async ([rows]) => {
      const user = rows[0];
      if (user == null) {
        res.sendStatus(404);
      } else {
        // Récupération des données de l'Interests
        const [interests] = await models.haveinterests.selectInterest(userId);
        user.interests = interests;
        // console.log(user, "userData retourne");
        res.status(200).json({ msg: "getUser success", userData: user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getById = (req, res) => {
  console.log(req.params.id, "userController: userId");
  const userId = parseInt(req.params.id);
  models.user
    .findUser(userId)
    .then(async ([rows]) => {
      const user = rows[0];
      if (user == null) {
        res.sendStatus(404);
      } else {
        // Récupération des données de l'Interests
        const [interests] = await models.haveinterests.selectInterest(userId);
        user.interests = interests;
        console.log(user, "userData retourne");
        res.status(200).json({ msg: "getUser success", userData: user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  const user = req.body;
  console.log(user, "user data");
  models.user
    .insert(user)
    .then(([result]) => {
      res
        .location(`/users/${result.insertId}`)
        .status(201)
        .json({ id: result.insertId, message: "User created successfully." });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const update = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  // console.log(user, "user data");

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ msg: "updated", user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateByOneUser = (req, res) => {
  const user = req.body;
  console.info("****Debug = req.body****");
  console.info(req.body);
  console.info("****Debug****");
  user.id = parseInt(req.params.id, 10);
  models.user
    .updateByUser(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ msg: "updated", user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const updateByOneUserAboutMe = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  models.user
    .updateAboutMe(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ msg: "updated", user });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  updateByOneUser,
  refeshUserById,
  updateByOneUserAboutMe,
};
