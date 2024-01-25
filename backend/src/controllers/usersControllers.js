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

const getById = (req, res) => {
  console.log(req.params.id, 'userController: userId')
  models.user
    .findUser(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        console.log(rows[0], 'userData retourne')
        res.status(200).json({msg: 'getUser success', userData: rows[0]});
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  const user = req.body;
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
  console.info('****Debug = req.body****')
  console.info(req.body);
  console.info('****Debug****')
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
};
