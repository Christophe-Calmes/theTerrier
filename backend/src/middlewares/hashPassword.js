const argon2 = require("argon2");

const hash = async (req, res, next) => {
  console.info(req.body.password);
  const { password } = req.body;
  try {
    const hashPassword = await argon2.hash(password, {hashLength: 62});
    console.info(hashPassword.length);
    req.body.password = hashPassword;
  } catch (err) {
    res.status(500).send("Error");
  }
  next();
};

module.exports = hash;
