const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");

app.use("/register", authRoutes);
