const db = require("../utils/db");

async function insertNewUser(username, email, password) {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  const values = [username, email, password];

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
insertNewUser("JohnBsdDoe", "john@example.com", "password123");
