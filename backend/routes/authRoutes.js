const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");

// Register a new user
router.post("/register", register);

module.exports = router;
