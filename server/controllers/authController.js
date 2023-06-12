const createUser = require("../../database/operations/userOps/createUser");

async function register(req, res) {
  // Extract the necessary information from the request body
  const { username, email, password } = req.body;

  const registration = await createUser(username, email, password);

  if (registration instanceof Object) {
    res.json({ message: registration });
  } else {
    res.json({ message: registration });
  }
}

module.exports = {
  register,
};
