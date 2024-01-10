const express = require("express");
const router = express.Router();
const sessionControllers = require("./controllers/sessionControllers")

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/usersControllers");

// Session
router.post("/login", sessionControllers.logIn);

// Exemples
router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// Users routes
router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/about_me/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
