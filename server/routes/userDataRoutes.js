const express = require("express");
const router = express.Router();

const UserOpsController = require("../controllers/userDataController");

router.post("/user/following", UserOpsController.getFollowing);

module.exports = router;
