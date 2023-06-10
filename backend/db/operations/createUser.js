const User = require("../models/user");

async function createUser(username, email, password) {
  let newUser;
  try {
    newUser = await User.create(username, email, password);
    if (newUser === User) {
      return [newUser, true];
    }
    return [newUser, false];
  } catch (error) {
    return newUser;
  }
}

module.exports = createUser;
