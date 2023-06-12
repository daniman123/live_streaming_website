const express = require("express");
const app = express();
const PORT = 8000;

// const authRoutes = require("./routes/authRoutes");

// app.use("/register", authRoutes);
app.get("/register", (req, res) => {
  res.json({ ss: ["sssss"] });
});

app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
});
