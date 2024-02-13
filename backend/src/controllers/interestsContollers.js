const models = require("../models");

const getAll = (req, res) => {
  models.interests
    .findAll()
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getAllByValid = (req, res) => {
  models.interests
  .sortingByValidInterests(parseInt(req.params.valid, 10))
  .then((rows) => {
    res.send(rows[0]);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
}
const getById = (req, res) => {
  models.interests
    .find(req.params.id)
    .then((rows) => {
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
  const interestsData = req.body;
  models.interests
    .insertInterests(interestsData)
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const update = (req, res) => {
  const interestsData = req.body;
  interestsData.id = parseInt(req.params.id, 10);
  // console.log(user, "user data");

  models.interests
    .updateInterests(interestsData)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({ msg: "updated", interestsData });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.interests
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
  getAllByValid,
  getById,
  create,
  update,
  destroy,
};
