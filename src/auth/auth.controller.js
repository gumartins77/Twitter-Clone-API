const authService = require("./auth.service");

const loginController = async (req, res) => {
  res.send({ message: "Login OK" });
};

module.exports = { loginController };
