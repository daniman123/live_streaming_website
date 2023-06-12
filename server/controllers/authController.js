async function register(req, res) {
  // Extract the necessary information from the request body
  const { username, email, password } = req.body;
  
  // Send a response indicating the successful registration
  res.json({ message: "User registered successfully" });
}

module.exports = {
  register,
};
