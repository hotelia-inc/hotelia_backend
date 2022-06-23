const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JSON_SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
