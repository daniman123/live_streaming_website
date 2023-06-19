const UserOpsService = require("../services/userOpsService");

class UserOpsController {
  constructor() {
    this.userOpsService = new UserOpsService();
    this.getFollowing = this.getFollowing.bind(this);
  }

  async getFollowing(req, res) {
    const { username } = req.body;
    const registration = await this.userOpsService.getFollowing(username);
    this.sendResponse(res, registration);
  }

  sendResponse(res, data) {
    res.json({ data });
  }
}

module.exports = new UserOpsController();
