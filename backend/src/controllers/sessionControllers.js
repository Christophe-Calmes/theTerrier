const jwt = require('jsonwebtoken');

const logIn = (req, res) => {
  const userData = req.body;
  console.info(userData);
  /* JWT generation */
  const jwtUser = jwt.sign(
    { id: userData.id, roleUser: userData.role_id },
    process.env.JWT_SECRET_KEY
  );
  res.status(200).json({ jwt: jwtUser, message: "connected" });
};

module.exports = {
  logIn,
};
