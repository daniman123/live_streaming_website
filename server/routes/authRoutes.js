const express = require("express");
const router = express.Router();

const { register } = require("../controllers/authController");

// Register a new user
router.get("/register", register);

module.exports = router;
