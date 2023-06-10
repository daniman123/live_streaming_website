const db = require("../utils/db");
const TABLES = require("./constants/tablesQueries");

// Loop over the array and create tables
Object.keys(TABLES).forEach(async (table) => {
  await db.createTable(TABLES[table].NAME, TABLES[table].DEFINITION);
});

db.close().then();
