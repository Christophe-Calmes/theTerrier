const express = require("express");

const router = express.Router();
const sessionControllers = require("./controllers/sessionControllers");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/usersControllers");
const rolesControllers = require("./controllers/rolesControllers");

const validatorUser = require("./validator/validatorUser");
const hashPassword = require("./middlewares/hashPassword");
const verifyPassword = require("./middlewares/verifiePassword");
const { verifyToken, isRightUser } = require("./middlewares/verifyToken");

// Session
router.post("/login", verifyPassword, sessionControllers.logIn);

// Exemples
router.get("/items", itemControllers.getAll);
router.get("/items/:id", itemControllers.getById);
router.post("/items", itemControllers.create);
router.put("/items/:id", itemControllers.update);
router.delete("/items/:id", itemControllers.destroy);

// Users routes
router.get("/users", userControllers.getAll);
router.get("/users/:id", userControllers.getById);
router.post("/users", validatorUser, hashPassword, userControllers.create);
router.put(
  "/users/:id",
  verifyToken,
  isRightUser,
  validatorUser,
  userControllers.update
);
router.delete("/users/:id", verifyToken, isRightUser, userControllers.destroy);
// Roles routes
router.get("/roles", rolesControllers.getAll);
router.get("/roles/:id", rolesControllers.getById);
router.post("/roles", rolesControllers.create);
router.put("/roles/:id", rolesControllers.update);
router.delete("/roles/:id", rolesControllers.destroy);

module.exports = router;
