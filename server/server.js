const express = require("express");
const cors = require("cors");
const app = express();
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

app.use("/", authRoutes);
app.use("/", userDataRoutes);
app.use("/", generalRoutes);



app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
});
