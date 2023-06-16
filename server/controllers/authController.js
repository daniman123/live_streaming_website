const getUserData = require("../../database/operations/userOps/getUserData");
const {
  insert,
  update,
} = require("../../database/operations/generalOps/basicQueries");
const createUser = require("../../database/operations/userOps/createUser");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const registration = await createUser(username, email, hashedPassword);

    const refreshToken = jwt.sign(
      { name: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await insert(username, refreshToken);

    res.json({
      message: {
        name: registration.username,
        email: registration.email,
        date: registration.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  let user;
  try {
    user = await getUserData(username);
    console.log("🚀 ~ file: authController.js:32 ~ login ~ user:", typeof user);
    if (!user) {
      res
        .status(401)
        .json(JSON.stringify({ message: "Invalid username or password." }));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign(
        { name: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { name: username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      await update(username, refreshToken);

      res.status(200).json({ accessToken: accessToken });
    } else {
      res
        .status(401)
        .json(JSON.stringify({ message: "Invalid username or password." }));
    }
  } catch (error) {
    res.status(403).json(error.message);
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (req, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = {
  register,
  login,
};
