const User = require("../../models/user");

async function createUser(username, email, password) {
  try {
    return User.create(username, email, password);
  } catch (error) {
    return error;
  }
}

module.exports = createUser;
