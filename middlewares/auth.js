const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");
const generateToken = require("../utils/generateToken");
//Declare and initialise a secret key for encoding incoming payload.

module.exports = {
  encode: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        const payload = {
          userId: user._id,
          userType: user.type,
        };
        req.authToken = generateToken(payload);
        next();
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  //Middleware for decoding authenticating a jwt token
  decode: (req, res, next) => {
    try {
      let accessToken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        try {
          accessToken = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(accessToken, process.env.JSON_SECRET_KEY);
          req.userId = decoded.payload.userId;
          console.log(req.userId);
          req.userType = decoded.payload.type;
          return next();
        } catch (error) {
          console.error(error);
          return res
            .status(401)
            .json({ success: false, message: error.message });
        }
      }
      if (!accessToken) {
        res.status(401);
        throw new Error("Not authorized. No token");
      }
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  },
};
