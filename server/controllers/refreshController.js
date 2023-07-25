const {
  getRefreshToken,
} = require("../../database/operations/generalOps/basicQueries");

const jwt = require("jsonwebtoken");
require("dotenv").config();

async function handleRefreshToken(req, res) {
  const cookies = req.cookies;
  
  if (!cookies?.jwt) return res.sendStatus(401);
  
  const refreshToken = cookies.jwt;

  let user;
  try {
    user = await getRefreshToken(refreshToken);
    
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

        res.json({
          accessToken,
          name: user[0].username
        });
        
      }
    );
  } catch (error) {
    console.error(
      "🚀 ~ file: refreshController.js:58 ~ handleRefreshToken ~ error:",
      error
    );
  }
}

module.exports = {
  handleRefreshToken,
};
