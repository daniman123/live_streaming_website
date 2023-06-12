const database = require("../../database");
const User = require("../../models/user");

async function getUserFollowing(username) {
  let userData;
  try {
    userData = await User.getByUsername(username);
    const sql = "SELECT * FROM Following WHERE follower_id = ?";
    const params = [userData.user_id];
    let result = await database.get(sql, params);
    const followedIds = result.map((dict) => dict.followed_id);

    const newsd = await Promise.all(
      followedIds.map(async (id) => {
        const result = await User.getById(id);
        return result.username;
      })
    );

    return newsd;
  } catch (error) {
    return userData;
  }
}

module.exports = getUserFollowing;
