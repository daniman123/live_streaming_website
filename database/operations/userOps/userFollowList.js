const database = require("../../database");
const User = require("../../models/user");

async function getFollowedUserIds(followerId) {
  const sql = "SELECT * FROM Following WHERE follower_id = ?";
  const params = [followerId];
  const result = await database.get(sql, params);
  return result.map((dict) => dict.followed_id);
}
 
async function getUsernamesForFollowedIds(userIds) {
  const usernamePromises = userIds.map(async (id) => {
    const user = await User.getById(id);
    return user.username;
  });
  return Promise.all(usernamePromises);
}

async function userFollowList(username) {
  const user = await User.getByUsername(username);
  const followedUserIds = await getFollowedUserIds(user.user_id);
  const followedUsernames = await getUsernamesForFollowedIds(followedUserIds);
  return followedUsernames;
}

module.exports = userFollowList;
