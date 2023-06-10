const DatabaseConnection = require("./db/databaseConnection");

class DatabaseUtility extends DatabaseConnection {
  constructor() {
    super();
    this.createTableStatement = `
      CREATE TABLE IF NOT EXISTS ? (
        ?
      )
    `;
    this.checkDuplicatesStatement = `SELECT * FROM User WHERE ? = ?`;

    this.createIndexStatement = `
      CREATE INDEX IF NOT EXISTS ? ON ? (?)
  `;
  }

  async createTable(tableName, tableDefinition) {
    try {
      await this.runQuery(this.createTableStatement, [
        tableName,
        tableDefinition,
      ]);
      return `Table '${tableName}' created successfully.`;
    } catch (error) {
      return `Error creating table '${tableName}': ${error}`;
    }
  }
  async getRow(query, params = []) {
    try {
      const rows = await this.runQueryAndReturnResults(query, params);
      if (rows.length > 0) {
        return rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving single row:", error);
      return null;
    }
  }
  async checkDuplicates(tableName, columnName, value) {
    const query = `
      SELECT COUNT(*) as count
      FROM ${tableName}
      WHERE ${columnName} = ?
    `;
    try {
      const result = await this.getRow(query, [value]);
      const count = result ? result.count : 0;
      const condition = count > 0;
      if (condition) console.log(`${columnName}: '${value}' already exists`);
      return condition;
    } catch (error) {
      console.error(`Error checking duplicates in '${tableName}'`, error);
      return false;
    }
  }

  async createIndex(indexName, tableName, columns) {
    try {
      await this.runQuery(this.createIndexStatement, [
        indexName,
        tableName,
        columns,
      ]);
      return `Index '${indexName}' created successfully.`;
    } catch (error) {
      return `Error creating index '${indexName}': ${error}`;
    }
  }

  async countRows(query, params = []) {
    try {
      const rows = await this.runQueryAndReturnResults(query, params);
      return rows.length;
    } catch (error) {
      return `Error counting rows: ${error}`;
    }
  }
}

module.exports = DatabaseUtility;
