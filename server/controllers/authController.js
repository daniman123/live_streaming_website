const getUserData = require("../../database/operations/userOps/getUserData");
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
  try {
    const user = await getUserData(username);
    console.log("🚀 ~ file: authController.js:32 ~ login ~ user:",typeof user)

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const accessToken = jwt.sign(
        { name: username },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.status(200).json({ accessToken: accessToken });
    } else {
      res
        .status(401)
        .json(JSON.stringify({ message: "Invalid username or password." }));
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(req, user)=>{
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })

}

module.exports = {
  register,
  login,
};
