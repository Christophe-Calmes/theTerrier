const models = require("../models");

const getAll = (req, res) => {
  models.relationship
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
  models.relationship
    .findByIdUser(req.params.id)
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
const addfriend = (req, res) => {
  const relation = [];
  relation.friend_id = req.body.friend_id;
  relation.me_id = req.body.me_id;
  models.relationship
    .insertFriend(relation)
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
const addBlockedUser = (req, res) => {
  const relation = [];
  relation.friend_id = req.body.friend_id;
  relation.me_id = req.body.me_id;
  models.relationship
    .insertBlocked(relation)
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
const addReportUser = (req, res) => {
  const relation = [];
  relation.friend_id = req.body.friend_id;
  relation.me_id = req.body.me_id;
  models.relationship
    .insertReport(relation)
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
const destroyeRelationWithUser = (req, res) => {
  const relation = [];
  relation.me_id = parseInt(req.params.id, 10);
  relation.friend_id = req.body.friend_id;
  models.relationship
    .deleteRelation(relation)
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
const destroyeRelationWithUserBloked = (req, res) => {
  const relation = [];
  relation.me_id = parseInt(req.params.id, 10);
  relation.friend_id = req.body.friend_id;
  models.relationship
    .deleteBlocked(relation)
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
const destroyeRelationWithUserReport = (req, res) => {
  const relation = [];
  relation.me_id = parseInt(req.params.id, 10);
  relation.friend_id = req.body.friend_id;
  models.relationship
    .deleteReport(relation)
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
  addfriend,
  addBlockedUser,
  addReportUser,
  destroyeRelationWithUser,
  destroyeRelationWithUserBloked,
  destroyeRelationWithUserReport,
};
