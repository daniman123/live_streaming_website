const db = require("../../utils/db");

async function insertNewUser(username, email, password) {
  const input = {
    username: username,
    email: email,
    password: password,
  };

  const sanitizedInput = db.sanitizeInput(input);
  console.log(
    "🚀 ~ file: newUserCreated.js:11 ~ insertNewUser ~ sanitizedInput:",
    sanitizedInput
  );

  // Validate the input input
  if (!db.validateInput(sanitizedInput)) {
    console.error("Invalid input input. Please check your input.");
    return;
  }

  // Check for duplicates
  const isUsernameDuplicate = await db.checkDuplicates(
    "User",
    "username",
    sanitizedInput.username
  );
  if (isUsernameDuplicate) {
    console.error(
      "Username already exists. Please choose a different username."
    );
    return;
  }

  const isEmailDuplicate = await db.checkDuplicates(
    "User",
    "email",
    sanitizedInput.email
  );
  if (isEmailDuplicate) {
    console.error("Email already exists. Please choose a different email.");
    return;
  }

  const query = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?)
  `;

  const values = [
    sanitizedInput.username,
    sanitizedInput.email,
    sanitizedInput.password,
  ];

  try {
    await db.runQuery(query, values);
    console.log("New user inserted successfully.");
  } catch (error) {
    console.error("Error inserting new user:", error);
  } finally {
    db.close();
  }
}

// Example usage
insertNewUser("Vizual_swami123", "dani@gmail.com", "password123");
insertNewUser("sjeko", "filip@gmail.com", "password123");
insertNewUser("poonslayer", "gusta@gmail.com", "password123");
insertNewUser("bulle", "ulle@gmail.com", "password123");
