const {
  getRefreshToken,
  deleteRefreshToken,
} = require("../../database/operations/generalOps/basicQueries");

require("dotenv").config();

async function logout(req, res) {
  // On client, delete accessToken

  const cookies = req.cookies;
  console.log("🚀 ~ file: logoutController.js:12 ~ logout ~ cookies:", cookies)
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
  logout,
};
