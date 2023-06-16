const tableGenerator = require("./generators/tableGenerator");
const TABLES = require("./constants/tablesQueries");
const db = require("../database");

async function createTables() {
  try {
    for (const tableName in TABLES) {
      const { NAME, DEFINITION } = TABLES[tableName];
      const result = await tableGenerator(NAME, DEFINITION, db);
      console.log(result);
    }
  } catch (error) {
    console.error(error); 
    // Handle any errors that occur during table creation
  }
}

// Call the createTables function
createTables();
