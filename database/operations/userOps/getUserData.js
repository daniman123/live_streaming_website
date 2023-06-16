const User = require("../../models/user");

async function getUserData(username) {
  let userData;
  try {
    userData = await User.getByUsername(username);
    return userData;
  } catch (error) {
    return userData;
  } 
}


module.exports = getUserData;
