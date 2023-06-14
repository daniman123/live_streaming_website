const createUser = require("../../database/operations/userOps/createUser");

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const registration = await createUser(username, email, password);
    res.json({
      message: {
        name: registration.username,
        email: registration.email,
        data: registration.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  register,
};
