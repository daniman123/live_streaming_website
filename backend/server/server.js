const express = require("express");
const cors = require("cors");
const app = express();

const db = require("../db/database");
const authRoutes = require("../controllers/authController");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse incoming request bodies
app.use(express.json());

// Sample middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Sample route to handle GET requests

app.use("/auth", authRoutes);

// Add more routes and middleware as needed...

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Close the database connection when the server is about to shut down
app.on("close", () => {
  db.close();
  console.log("Database connection closed");
});
