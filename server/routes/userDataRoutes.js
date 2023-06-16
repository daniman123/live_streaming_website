const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth-middleware");

const UserOpsController = require("../controllers/userDataController");

router.post("/user/following", UserOpsController.getFollowing);

module.exports = router;
