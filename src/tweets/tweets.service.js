const Tweet = require("./Tweet");

const createTweetService = (message, userId) => {
  return Tweet.create({ message, user: userId });
};

const findAllTweetesService = (offset = 0, limit = 5) => {
  return Tweet.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
};

const countTweets = () => {
  return Tweet.countDocuments();
};

const searchTweetService = (message) => {
  return Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
};

const likesService = (id, userId) => {
  return Tweet.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

const retweetsService = (id, userId) => {
  return Tweet.findOneAndUpdate(
    {
      _id: id,
      "retweets.userId": { $nin: [userId] },
    },
    {
      $push: {
        retweets: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

const commentsService = (id, userId) => {
  return Tweet.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

module.exports = {
  createTweetService,
  findAllTweetesService,
  countTweets,
  searchTweetService,
  likesService,
  retweetsService,
  commentsService,
};
