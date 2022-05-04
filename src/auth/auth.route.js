const route = require("express").Router();
const authController = require("./auth.controller");

route.post("/signin", authController.loginController);

module.exports = route;