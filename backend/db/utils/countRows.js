const database = require("../database");

async function countRows(query, params = []) {
  try {
    const rows = await database.get(query, params);
    return rows.length;
  } catch (error) {
    return `Error counting rows: ${error}`;
  }
}

module.exports = { countRows };
