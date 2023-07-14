const express = require("express");
const { login, register, logOut } = require("../controler/authController");
const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
module.exports = authRouter;
