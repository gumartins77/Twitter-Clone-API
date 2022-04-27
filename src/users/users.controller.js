const createUserController = async (req, res) => {
  res.send({ message: "Create OK" });
};
const findAllUserController = async (req, res) => {
  res.send({ message: "Find All Users OK" });
};

module.exports = {
  createUserController,
  findAllUserController,
};
