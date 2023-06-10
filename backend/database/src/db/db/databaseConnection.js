const sqlite3 = require("sqlite3");
const { promisify } = require("util");
const path = require("path");

class DatabaseConnection {
  constructor() {
    this.userProfileDbPath = path.join(
      __dirname.slice(0, __dirname.indexOf("src")),
      "data/user_info_data.sqlite"
    );

    this.db = new sqlite3.Database(this.userProfileDbPath);
    this.runQueryPromise = promisify(this.db.run.bind(this.db));
    this.allPromise = promisify(this.db.all.bind(this.db));
  }

  async runQuery(query, params = []) {
    try {
      await this.runQueryPromise(query, params);
    } catch (error) {
      console.error("Error running query:", error);
      throw error;
    }
  }

  async runQueryAndReturnResults(query, params = []) {
    try {
      return await this.allPromise(query, params);
    } catch (error) {
      console.error("Error running query and returning results:", error);
      throw error;
    }
  }

  async close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.db = null;
          resolve();
        }
      });
    });
  }
}

module.exports = DatabaseConnection;
