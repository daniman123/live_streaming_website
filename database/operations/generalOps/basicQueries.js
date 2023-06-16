const database = require("../../database");

async function insert(username, token) {
  const sql = `
      INSERT INTO Tokens (username, token, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `;
  const params = [username, token];

  try {
    await database.runQuery(sql, params);
  } catch (error) {
    throw new Error(`Error inserting Tokens: ${error.message}`);
  }
}

async function update(username, token) {
  const sql = `
    UPDATE Tokens
    SET username = ?, token = ?, updated_at = CURRENT_TIMESTAMP
    WHERE username = ?
  `;
  const params = [username, token, username];

  try {
    await database.runQuery(sql, params);
  } catch (error) {
    throw new Error(`Error updating Tokens: ${error.message}`);
  }
}

module.exports = {
  update,
  insert,
};
