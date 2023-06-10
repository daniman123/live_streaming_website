const database = require("../database");

async function createIndex(indexName, tableName, columns) {
  const createIndexStatement = `
      CREATE INDEX IF NOT EXISTS ? ON ? (?)
  `;
  try {
    await database.runQuery(createIndexStatement, [
      indexName,
      tableName,
      columns,
    ]);
    return `Index '${indexName}' created successfully.`;
  } catch (error) {
    return `Error creating index '${indexName}': ${error}`;
  }
}

module.exports = { createIndex };
