const createUser = require("../../database/operations/createUser");

async function register(req, res) {
  const { username, email, password } = req.body;
  const newUser = await createUser(username, email, password);
  res.status(201).json(newUser);
}

module.exports = {
  register,
};
