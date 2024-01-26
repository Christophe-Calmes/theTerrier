// Verify JWT
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET_KEY;

const verifyToken = async (req, res, next) => {
  console.log("verifyToken");
  const { jwtToken } = req.body;
  // console.log(jwtToken, "jwtToken");

  // authorizationHeader: Bearer Aesdfsdfopouououolkjlkjlz
  // const jwtToken = authorizationHeader.split(" ")[1];

  try {
    jwt.verify(jwtToken, jwtKey, (error, decoded) => {
      if (error) {
        const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;
        return res.status(401).json({ message, data: error });
      }

      // Retrive infos from the jwt.payload
      req.userAuth = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
  }
};

const isRightUser = async (req, res, next) => {
  console.log("isRightUser");
  const { userAuth } = req;
  const userId = parseInt(req.params.id);
  if (userId == userAuth.id) {
    next();
  } else {
    return res.status(403).json({ msg: "Forbidden: you are not the one !" });
  }
};

module.exports = { verifyToken, isRightUser };
