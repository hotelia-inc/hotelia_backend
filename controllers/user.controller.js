const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("express-async-handler");
// models
const UserModel = require("../models/User.js");
const { USER_TYPES } = require("../models/User.js");

module.exports = {
  // @desc     Login User
  // @route    POST /users/login
  // @access   Public
  onLogin: async (req, res, next) => {
    return res.status(200).json({
      success: true,
      token: req.authToken,
    });
  },
  onCreateUser: asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, type } = req.body;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      res.json({
        status: 400,
        //res.status(400).json({
        success: false,
        message: "User already exist",
      });
      //throw createError(400, "User already exist");
      //throw new Error("User already exists");
    }
    const user = await UserModel.createUser(
      firstName,
      lastName,
      email,
      password,
      type
    );
    if (user) {
      const payload = {
        userId: user._id,
        userType: user.type,
      };
      return res.status(201).json({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        token: generateToken(payload),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),

  // @desc     Fetch User Profile
  // @route    GET /users/profile
  // @access   Private
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.getUserById(req.userId); //params.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // @desc     Fetch All Users
  // @route    GET /users/
  // @access   Private
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.getUsers();
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  // @desc     Delete User
  // @route    DELETE /users/remove/:id
  // @access   Private
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
