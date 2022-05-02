const route = require("express").Router();
const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

route.post("/", authMiddleware, tweetController.createTweetController);
route.get("/", authMiddleware, tweetController.findAllTweetesController);

module.exports = route;
