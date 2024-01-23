const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET_KEY;

const logIn = (req, res) => {
  const userData = req.body;
  console.info(userData, "Login: userData");
  /* JWT generation */
  const jwtToken = jwt.sign(
    {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      roleUser: userData.role_id,
    },
    jwtKey,
    {
      expiresIn: "7d",
    }
  );
  res.status(200).json({ message: "connected", jwtToken, userData });
};

module.exports = {
  logIn,
};
