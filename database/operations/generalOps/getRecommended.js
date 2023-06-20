const database = require("../../database");

async function getRecommended(limit) {
  const query = `
  SELECT username
  FROM User
  ORDER BY RANDOM()
  LIMIT ?;
`;
  const params = [limit];
  const result = await database.get(query, params);
  return result.map((dict) => dict.username);
}

module.exports = { getRecommended };
