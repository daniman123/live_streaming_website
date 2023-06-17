const express = require("express");
const router = express.Router();

const { handleRefreshToken } = require("../controllers/refreshController");

// Register a new user
router.get("/refresh", handleRefreshToken);

module.exports = router;
