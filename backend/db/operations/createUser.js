const User = require("../models/user");

async function createUser(username, email, password) {
  let newUser;
  try {
    newUser = await User.create(username, email, password);
    return newUser;
  } catch (error) {
    return newUser;
  }
}

module.exports = createUser;
