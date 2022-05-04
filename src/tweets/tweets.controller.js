const tweetService = require("./tweets.service");

const createTweetController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).send({
        message: "Envie todos os dados necessários para criar o tweet!",
      });
    }

    const { id } = await tweetService.createTweetService(message, req.userId);

    return res.send({
      message: "Tweet criado com sucesso!",
      tweet: { id, message },
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Ops, erro no servidor, tente novamente mais tarde!" });
    console.log(err.message);
  }
};

const findAllTweetesController = async (req, res) => {
  try {
    const tweets = await tweetService.findAllTweetesService();

    if (tweets.length === 0) {
      return res.status(400).send({ message: "Não existem tweets!" });
    }

    return res.send({
      results: tweets.map((tweet) => ({
        id: tweet._id,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
        name: tweet.user.name,
        username: tweet.user.username,
        avatar: tweet.user.avatar,
      })),
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Ops, erro no servidor, tente novamente mais tarde!" });
    console.log(err.message);
  }
};

const searchTweetController = async (req, res) => {
  try {
    const { message } = req.query;

    const tweets = await tweetService.searchTweetService(message);

    if (tweets.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existem tweets com essa mensagem!" });
    }

    return res.send({
      tweets: tweets.map((tweet) => ({
        id: tweet._id,
        message: tweet.message,
        likes: tweet.likes.length,
        comments: tweet.comments.length,
        retweets: tweet.retweets.length,
        name: tweet.user.name,
        username: tweet.user.username,
        avatar: tweet.user.avatar,
      })),
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Ops, erro no servidor, tente novamente mais tarde!" });
    console.log(err.message);
  }
};

const likeTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetLiked = await tweetService.likesService(id, userId);

  if (tweetLiked.lastErrorObject.n === 0) {
    return res.status(400).send({ message: "Você já deu like neste tweet!" });
  }

  return res.send({ message: "Like realizado com sucesso!" });
};

const retweetTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetRetweeted = await tweetService.retweetsService(id, userId);

  if (tweetRetweeted.lastErrorObject.n === 0) {
    return res.status(400).send({ message: "Você já deu retweet neste tweet!" });
  }

  return res.send({ message: "Retweet realizado com sucesso!" });
};

const commentTweetController = async (req, res) => {
  const { id } = req.params;

  const userId = req.userId;

  const tweetcommented = await tweetService.commentsService(id, userId);

  return res.send({ message: "Comentario realizado com sucesso!" });
};

module.exports = {
  createTweetController,
  findAllTweetesController,
  searchTweetController,
  likeTweetController,
  retweetTweetController,
  commentTweetController,
};
