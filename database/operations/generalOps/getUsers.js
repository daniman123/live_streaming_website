const database = require("../../database");

async function getUsers() {
  const query = `
  SELECT username
  FROM User
`;

  const result = await database.get(query);
  return result.map((dict) => dict.username);
}

module.exports = { getUsers };
