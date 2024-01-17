const express = require("express");

const router = express.Router();
const sessionControllers = require("./controllers/sessionControllers");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/usersControllers");

const validatorUser = require("./validator/validatorUser");
const hash = require("./middlewares/hashPassword");
const verify = require("./middlewares/verifiePassword");
const verifyToken = require("./middlewares/jsonwebtoken");

// Session
router.post("/login", verify, sessionControllers.logIn);

// Exemples
router.get("/items", itemControllers.getAll);
router.get("/items/:id", itemControllers.getById);
router.post("/items", itemControllers.create);
router.put("/items/:id", itemControllers.update);
router.delete("/items/:id", itemControllers.destroy);

// Users routes
router.get("/users", userControllers.getAll);
router.get("/users/:id", userControllers.getById);
router.post("/users", userControllers.create);
router.put("/users/:id", userControllers.update);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
