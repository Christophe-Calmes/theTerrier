const models = require("../models");

const getAll = (req, res) => {
  models.haveinterests
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getByUserId = (req, res) => {
  console.log(req.params.userId, "getByUserId: userId");
  models.haveinterests
    .selectInterest(req.params.userId)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addHaveInterest = (req, res) => {
  const haveInterest = [];
  haveInterest.user_id = parseInt(req.params.id, 10);
  console.info(haveInterest.user_id);
  haveInterest.interest_id = req.body.interest_id;
  console.info(haveInterest.interest_id);
  models.haveinterests
    .insertNewInterest(haveInterest)
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
const destroyHaveInterest = (req, res) => {
  const haveInterest = [];
  haveInterest.user_id = parseInt(req.params.id, 10);
  haveInterest.interest_id = req.body.interest_id;
  models.haveinterests
    .deleteHaveInterest(haveInterest)
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
  getByUserId,
  addHaveInterest,
  destroyHaveInterest,
};
