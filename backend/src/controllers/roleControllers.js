const models = require("../models");

const getAll = (req, res) => {
  models.roles
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
  models.roles
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const create = (req, res) => {
  const dataRole = req.body;
  models.roles
    .insertRoles(dataRole)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const update = (req, res) => {
  const dataRole = req.body;
  dataRole.id = parseInt(req.params.id, 10);
  // console.log(user, "user data");

  models.roles
    .updateRoleLevel(dataRole)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ msg: "updated", dataRole });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.roles
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
};
