const userFollowList = require("../../database/operations/userOps/userFollowList");

class UserOpsService {
  async getFollowing(username) {
    return userFollowList(username);
  }
}

module.exports = UserOpsService;
