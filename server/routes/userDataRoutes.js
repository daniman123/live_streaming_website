const express = require("express");
const router = express.Router();

const { getFollowing } = require("../controllers/userDataController");

// Register a new user
router.get("/get_following", getFollowing);

module.exports = router;
