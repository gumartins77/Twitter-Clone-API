const route = require("express").Router();
const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

route.post("/", authMiddleware, tweetController.createTweetController);

module.exports = route;
