const createUser = require("../../database/operations/userOps/createUser");

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const registration = await createUser(username, email, password);
    res.json({ message: registration });
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = {
  register,
};
