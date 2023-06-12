const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log("LISTENING ON PORT:", PORT);
});
