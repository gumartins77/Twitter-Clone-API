const route = require("express").Router();
const tweetController = require("./tweets.controller");
const authMiddleware = require("../auth/auth.middleware");

route.post("/", authMiddleware, tweetController.createTweetController);
route.get("/", authMiddleware, tweetController.findAllTweetesController);
route.get("/search", authMiddleware, tweetController.searchTweetController);
route.patch("/:id/like", authMiddleware, tweetController.likeTweetController);
route.patch(
  "/:id/retweet",
  authMiddleware,
  tweetController.retweetTweetController
);
route.patch(
  "/:id/comment",
  authMiddleware,
  tweetController.commentTweetController
);

module.exports = route;
