const db = require("../../database");
const {
  INSERT_FOLLOW,
  SELECT_FOLLOW,
} = require("./constants/followingDataQueries");

async function FollowUser(followerId, followedId, followedDate) {
  if (followerId === followedId) throw "Cannot follow yourself";
  let insertFollowParams = [followerId, followedId, followedDate];
  const isAlreadyFollowing = await getFollow(followerId, followedId);
  if (!isAlreadyFollowing)
    return db.runQuery(INSERT_FOLLOW, insertFollowParams);
  console.log("🚀You are already following:", followedId);
}

async function UnFollowUser(followerId, followedId) {
  if (followerId === followedId) return;
  const isFollowing = await getFollow(followerId, followedId);
  if (!isFollowing) return;

  condition = `follower_id = ${followerId} AND followed_id = ${followedId}`;
  await db.deleteRecord("Following", condition);
}

async function getFollow(followerId, followedId) {
  const params = [followerId, followedId];
  const subscriptions = await db.get(SELECT_FOLLOW, params);
  return subscriptions[0];
}
FollowUser(3, 1, new Date());
// UnFollowUser(1, 5);

module.exports = FollowUser;
