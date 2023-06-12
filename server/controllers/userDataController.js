const getUserFollowing = require("../../database/operations/userOps/getUserFollowing");

async function getFollowing(req, res) {
  // Extract the necessary information from the request body
  const { username } = req.body;

  // console.log("🚀 ~ file: userDataController.js:6 ~ getFollowing ~ username:", username)
  const registration = await getUserFollowing(req.query.username);

  res.json({ message: registration });
}

module.exports = {
  getFollowing,
};
