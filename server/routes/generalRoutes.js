const express = require("express");
const router = express.Router();

const { recommendedList } = require("../controllers/generalController");

// Register a new user
router.get("/recommended", recommendedList);

module.exports = router;
