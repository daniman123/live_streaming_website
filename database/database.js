const sqlite3 = require("sqlite3");
const { promisify } = require("util");
const path = require("path");

class Database {
  constructor() {
    this.userProfileDbPath = path.join(__dirname, "data/user_info_data.sqlite");

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

  get(query, params = []) {
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

const database = new Database();
module.exports = database;
