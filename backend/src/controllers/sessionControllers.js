const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET_KEY;

const logIn = (req, res) => {
  const userData = req.body;
  console.info(userData);
  /* JWT generation */
  const jwtToken = jwt.sign(
    { id: userData.id, roleUser: userData.role_id },
    jwtKey,
    {
      expiresIn: "7d",
    }
  );
  res.status(200).json({ jwtToken, message: "connected" });
};

module.exports = {
  logIn,
};
