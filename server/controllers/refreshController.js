const {
  getRefreshToken,
} = require("../../database/operations/generalOps/basicQueries");

const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleRefreshToken(req, res) {
  const cookies = req.cookies;
  console.log(
    "🚀 ~ file: refreshController.js:10 ~ handleRefreshToken ~ cookies:",
    cookies
  );
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(
    "🚀 ~ file: refreshController.js:14 ~ handleRefreshToken ~ cookies.jwt:",
    cookies.jwt
  );

  const refreshToken = cookies.jwt;
  console.log(
    "🚀 ~ file: refreshController.js:17 ~ handleRefreshToken ~ refreshToken:",
    refreshToken
  );

  let user;
  try {
    user = await getRefreshToken(refreshToken);
    console.log(
      "🚀 ~ file: refreshController.js:29 ~ handleRefreshToken ~ user:",
      user
    );
    if (!user) {
      res
        .status(401)
        .json(JSON.stringify({ message: "Invalid username or password." }));
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.username !== decoded.username)
          return res.sendStatus(403);
        const accessToken = jwt.sign(
          { username: decoded.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch {}
}

module.exports = {
  handleRefreshToken,
};
