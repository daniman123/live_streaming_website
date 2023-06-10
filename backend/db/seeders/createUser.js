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

// Run multiple instances of createUser concurrently
async function runConcurrentUserCreation() {
  const numInstances = 4; // Number of concurrent instances

  // Create an array of tasks
  const tasks = Array(numInstances).fill(createUser);

  // Execute tasks concurrently using Promise.all
  try {
    await Promise.all(tasks.map((task) => task()));
    console.log("All user creation tasks completed.");
  } catch (error) {
    console.error("Error running concurrent user creation:", error);
  }
}

// Invoke the function to run concurrent user creation
// runConcurrentUserCreation();
