const route = require("express").Router();
const userController = require("./users.controller");

route.post("/", userController.createUserController);
route.get("/", userController.findAllUserController);

module.exports = route
