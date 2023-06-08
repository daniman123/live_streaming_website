const db = require("../../utils/db");

class UserRepository {
  async insertUser(username, email, password) {
    const query = `
      INSERT INTO User (username, email, password)
      VALUES (?, ?, ?)
    `;

    const values = [username, email, password];

    try {
      await db.runQuery(query, values);
      console.log("New user inserted successfully.");
    } catch (error) {
      console.error("Error inserting new user:", error);
      throw error;
    } finally {
      await db.close();
    }
  }
}

module.exports = UserRepository;
