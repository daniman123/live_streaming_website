async function tableGenerator(tableName, tableDefinition, database) {
  try {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`;
    await database.runQuery(query);
    return `Table '${tableName}' created successfully.`;
  } catch (error) {
    console.error(`Error creating table '${tableName}': ${error}`);
    throw error;
  }
}

module.exports = tableGenerator;
