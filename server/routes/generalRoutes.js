const express = require("express");
const router = express.Router();

const { recommendedList } = require("../controllers/generalController");
const { users } = require("../controllers/generalController");

// Register a new user
router.get("/recommended", recommendedList);
router.get("/users", users);

module.exports = router;
