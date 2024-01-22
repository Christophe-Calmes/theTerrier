const models = require("../models");

const getAll = (req, res) => {
  models.messages
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const destroy = (req, res) => {
  models.messages
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
const addMessages = (req, res) => {
  const message = req.body;
  models.messages
    .insertMessage(message)
    .then(([result]) => {
      res.location(`/messages/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const chatMessages = (req, res) => {
  const paramMessage = req.body;
  models.messages
    .privateChat(paramMessage)
    .then(([result]) => {
      res.location(`/messages/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAll,
  destroy,
  addMessages,
  chatMessages,
};
