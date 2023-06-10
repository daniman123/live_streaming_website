const DatabaseConnection = require("./db/databaseConnection");

class TransactionManager extends DatabaseConnection {
  async startTransaction() {
    try {
      await this.runQuery("BEGIN TRANSACTION");
      return "Transaction started";
    } catch (error) {
      console.error("Error starting transaction:", error);
      throw error;
    }
  }

  async commitTransaction() {
    try {
      await this.runQuery("COMMIT");
      return "Transaction committed";
    } catch (error) {
      console.error("Error committing transaction:", error);
      throw error;
    }
  }

  async rollbackTransaction() {
    try {
      await this.runQuery("ROLLBACK");
      return "Transaction rolled back";
    } catch (error) {
      console.error("Error rolling back transaction:", error);
      throw error;
    }
  }
}

module.exports = TransactionManager;
