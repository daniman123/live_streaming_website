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
    try {
      this.db.close();
    } catch (error) {}
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
      this.close();
    }
  }
}

const db = new Database();

module.exports = db;
