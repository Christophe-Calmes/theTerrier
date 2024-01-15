// Verify JWT
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (jwt.verify(req.body.jwtUser, process.env.JWT_SECRET_KEY)) {
    console.log(req.body.jwtUser);
    next();
  } else {
    res.status(500).send("Invalide token");
  }
};
module.exports = verifyToken;
