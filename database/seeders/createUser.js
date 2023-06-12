const User = require("../models/user");

async function createUser() {
  try {
    const username = "josssss_doe";
    const email = "jossss@example.com";
    const password = "password123";

    const newUser = await User.create(username, email, password);
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
