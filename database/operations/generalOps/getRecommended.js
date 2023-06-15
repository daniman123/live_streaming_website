const database = require("../../database");

async function getRecommended() {
  const query = `
  SELECT username
  FROM User
  ORDER BY RANDOM()
  LIMIT 10;
`;

  const result = await database.get(query);
  return result.map((dict) => dict.username);
}

module.exports = { getRecommended };
