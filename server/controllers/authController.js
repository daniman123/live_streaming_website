const getUserData = require("../../database/operations/userOps/getUserData");
const {
  insert,
  update,
  getRefreshToken,
  deleteRefreshToken,
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

    const accessToken = jwt.sign(
      { name: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
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

    await insert(username, refreshToken);

    res.status(200).json({ accessToken: accessToken });
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
        { expiresIn: "15m" }
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

async function logout(req, res) {
  // On client, delete accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //sucess content deleted
  const refreshToken = cookies.jwt;

  let user;
  try {
    user = await getRefreshToken(refreshToken);

    if (!user) {
      res.clearCookie("jwt", { httpOnly: true });
      return res.sendStatus(204);
    }

    // delete refreshToken in db
    await deleteRefreshToken(refreshToken);

    res.clearCookie("jwt", { httpOnly: true }); // in Production add option: secure: true, for https
    res.sendStatus(204);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  register,
  login,
  logout,
};
