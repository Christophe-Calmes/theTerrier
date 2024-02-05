const express = require("express");

const router = express.Router();
const sessionControllers = require("./controllers/sessionControllers");

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/usersControllers");
const rolesControllers = require("./controllers/rolesControllers");
const interestsControllers = require("./controllers/interestsContollers");
const relationshipControllers = require("./controllers/relationshipController");
const haveInterestControllers = require("./controllers/haveInterestsController");
const messagesControllers = require("./controllers/messagesController");

const validatorUser = require("./validator/validatorUser");
const hashPassword = require("./middlewares/hashPassword");
const verifyPassword = require("./middlewares/verifiePassword");
const { verifyToken, isRightUser } = require("./middlewares/verifyToken");

router.get("/", (req, res) => {
  res.status(200).json("Hello, your app run on port 5000");
  // .json(`Hello, your app run on port ${process.env.APP_PORT}`);
});

// Session
router.post("/login", verifyPassword, sessionControllers.logIn);
router.post("/checkAndRefeshJwt", verifyToken, userControllers.refeshUserById);

// Exemples
router.get("/items", itemControllers.getAll);
router.get("/items/:id", itemControllers.getById);
router.post("/items", itemControllers.create);
router.put("/items/:id", itemControllers.update);
router.delete("/items/:id", itemControllers.destroy);

// Users routes
router.get("/users", userControllers.getAll);
router.get("/users/:id", userControllers.getById);
router.post("/users", hashPassword, userControllers.create);
// router.post("/users", validatorUser, hashPassword, userControllers.create);
router.put(
  "/users/:id",
  verifyToken,
  isRightUser,
  validatorUser,
  userControllers.update
);
router.put("/users/update/:id", userControllers.updateByOneUser);
router.put("/users/update/aboutme/:id", userControllers.updateByOneUserAboutMe);

router.delete("/users/:id", verifyToken, isRightUser, userControllers.destroy);
// Roles routes
router.get("/roles", rolesControllers.getAll);
router.get("/roles/:id", rolesControllers.getById);
router.post("/roles", rolesControllers.create);
router.put("/roles/:id", rolesControllers.update);
router.delete("/roles/:id", verifyToken, rolesControllers.destroy);
// Interests routes
router.get("/interests", interestsControllers.getAll);
router.get("/interests/:id", interestsControllers.getById);
router.post("/interests", interestsControllers.create);
router.put("/interests/:id", interestsControllers.update);
router.delete("/interests/:id", verifyToken, interestsControllers.destroy);
// Relationship routes
router.get("/relationship", relationshipControllers.getAll);
router.get("/relationship/:id", relationshipControllers.getById);
router.post("/relationship/addfriend", relationshipControllers.addfriend);
router.post(
  "/relationship/addblockuser",
  relationshipControllers.addBlockedUser
);
router.post(
  "/relationship/addreportuser",
  relationshipControllers.addReportUser
);
router.delete(
  "/relationship/friend/:id",
  relationshipControllers.destroyeRelationWithUser
);
router.delete(
  "/relationship/blocked/:id",
  relationshipControllers.destroyeRelationWithUserBloked
);
router.delete(
  "/relationship/report/:id",
  relationshipControllers.destroyeRelationWithUserReport
);
// Have_interest routes
router.get("/haveinterests", haveInterestControllers.getAll);
router.get("/haveinterests/:userId", haveInterestControllers.getByUserId);
router.post("/haveinterests/:id", haveInterestControllers.addHaveInterest);
router.delete(
  "/haveinterests/:id",
  haveInterestControllers.destroyHaveInterest
);
// messages
router.get("/messages", messagesControllers.getAll);
router.get("/privatechat", messagesControllers.chatMessages);
router.delete("/message/:id", messagesControllers.destroy);
router.post("/messages", messagesControllers.addMessages);

module.exports = router;
