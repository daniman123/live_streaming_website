const database = require("../database");

async function checkDuplicates(tableName, columnName, value) {
  const query = `
    SELECT COUNT(*) as count
    FROM ${tableName}
    WHERE ${columnName} = ?
  `;
  try {
    const result = await database.get(query, [value]);
    const count = result ? result[0].count : 0;
    const condition = count > 0;
    if (condition) console.log(`${columnName}: '${value}' already exists`);
    return condition;
  } catch (error) {
    console.error(`Error checking duplicates in '${tableName}'`, error);
    return false;
  }
}

module.exports = checkDuplicates;

/* 

  checkDuplicatesStatement = `SELECT * FROM User WHERE ? = ?`;


*/
