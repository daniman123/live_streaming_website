const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { authenticateToken } = require("./middlewares/auth-middleware");

const PORT = 8000;

const authRoutes = require("./routes/authRoutes");
const userDataRoutes = require("./routes/userDataRoutes");
const generalRoutes = require("./routes/generalRoutes");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("🚀 INCOMING:", req.method, "REQUEST");
  next();
});

app.use(cookieParser());

app.use("/", generalRoutes);
app.use("/", authRoutes);

// app.use(authenticateToken);
app.use("/", authenticateToken, userDataRoutes);

app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
});
