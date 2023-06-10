const User = require("../models/user");

async function createUser(username, email, password) {
  try {
    const newUser = await User.create(username, email, password);
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

module.exports = createUser ;
