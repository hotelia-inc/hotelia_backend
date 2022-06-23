const express = require("express");
//controllers
const user = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.js");
const router = express.Router();

router
  .get("/", user.onGetAllUsers)
  .post("/register", user.onCreateUser)
  .post("/login", auth.encode, user.onLogin)
  .get("/profile", auth.decode, user.onGetUserById)
  .delete("/remove/:id", user.onDeleteUserById);

module.exports = router;
