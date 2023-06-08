const sqlite3 = require("sqlite3").verbose();
const path = require("path");

class Database {
  constructor() {
    this.userProfileDbPath =
      "C:\\Users\\Danie\\Desktop\\live_streaming_website\\database\\data\\user_info_data.sqlite";

    this.db = new sqlite3.Database(this.userProfileDbPath);
  }

  runQuery(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  runQueryAndReturnResults(query, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async createTable(tableName, tableDefinition) {
    const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${tableDefinition}
      )
    `;

    try {
      await this.runQuery(query);
      console.log(`Table '${tableName}' created successfully.`);
    } catch (error) {
      console.error(`Error creating table '${tableName}':`, error);
    } finally {
      await this.close();
    }
  }

  async checkDuplicates(tableName, columnName, value) {
    const query = `
      SELECT COUNT(*) as count
      FROM ${tableName}
      WHERE ${columnName} = ?
    `;
    try {
      const result = await this.getSingleRow(query, [value]);
      const count = result ? result.count : 0;
      const condition = count > 0;
      if (condition) console.log(`${columnName}: '${value}' already exists`);
      return condition;
    } catch (error) {
      console.error(`Error checking duplicates in '${tableName}'`, error);
      return false;
    }
  }

  async startTransaction() {
    return new Promise((resolve, reject) => {
      this.db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async commitTransaction() {
    return new Promise((resolve, reject) => {
      this.db.run("COMMIT", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async rollbackTransaction() {
    return new Promise((resolve, reject) => {
      this.db.run("ROLLBACK", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async createIndex(indexName, tableName, columns) {
    const query = `CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName} (${columns})`;

    try {
      await this.runQuery(query);
      console.log(`Index '${indexName}' created successfully.`);
    } catch (error) {
      console.error(`Error creating index '${indexName}':`, error);
    }
  }

  async updateRecord(tableName, columnValues, condition) {
    const setClause = Object.keys(columnValues)
      .map((column) => `${column} = ?`)
      .join(", ");
    const values = Object.values(columnValues);

    const query = `
      UPDATE ${tableName}
      SET ${setClause}
      WHERE ${condition}
    `;

    try {
      await this.runQuery(query, values);
      console.log(`Record updated successfully in '${tableName}'.`);
    } catch (error) {
      console.error(`Error updating record in '${tableName}':`, error);
    }
  }

  async deleteRecord(tableName, condition) {
    const query = `
      DELETE FROM ${tableName}
      WHERE ${condition}
    `;

    try {
      await this.runQuery(query);
      console.log(`Record deleted successfully from '${tableName}'.`);
    } catch (error) {
      console.error(`Error deleting record from '${tableName}':`, error);
    }
  }

  async getSingleRow(query, params = []) {
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

  async countRows(query, params = []) {
    try {
      const rows = await this.runQueryAndReturnResults(query, params);
      return rows.length;
    } catch (error) {
      console.error("Error counting rows:", error);
      return -1;
    }
  }

  async aggregateData(query, params = []) {
    try {
      const result = await this.runQueryAndReturnResults(query, params);
      return result;
    } catch (error) {
      console.error("Error aggregating data:", error);
      return null;
    }
  }

  validateInput(input) {
    // Validate the input values
    const { username, email, password } = input;

    // Validate username
    if (username.length < 3 || username.length > 20) {
      console.log("Username length should be between 3 and 20 characters");
      return false; // Username length should be between 3 and 20 characters
    }

    // Validate email
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format");
      return false; // Invalid email format
    }

    // Validate password
    if (password.length < 8) {
      console.log("Password should be at least 8 characters long");
      return false; // Password should be at least 8 characters long
    }

    return true; // All input values are valid
  }

  sanitizeInput(input) {
    // Sanitize the input values
    const sanitizedInput = {
      username: input.username.trim().toLowerCase(),
      email: input.email.trim().toLowerCase(),
      password: input.password, // No sanitization for passwords
    };

    return sanitizedInput;
  }

  async migrateDatabase() {
    // Implement your database migration logic here
    // Handle schema changes and maintain data integrity over time
  }
}

const db = new Database();

module.exports = db;
