const User = require("../models/user");

async function createUser() {
  try {
    const username = "gab";
    const email = "gab@example.com";
    const password = "12345678";

    const newUser = await User.create(username, email, password);
    console.log(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
