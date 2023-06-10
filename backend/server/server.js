const express = require("express");
const cors = require("cors");
const app = express();

const db = require("../database/src/utils/db");
const registerNewUser = require("../database/src/user_data/userRegistration/registerNewUser");

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

app.post("/api/register", async (req, res) => {
  // Retrieve user data from the request body
  const { username, email, password } = req.body;

  // Perform user registration logic
  await registerNewUser(username, email, password);

  // Send a response indicating success or failure
  res.json({ message: "User registered successfully" });
});

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
