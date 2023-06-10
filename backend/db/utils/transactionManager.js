const database = require("../database");

class TransactionManager {
  async startTransaction() {
    try {
      await database.runQuery("BEGIN EXCLUSIVE; BEGIN TRANSACTION");
      return "Transaction started";
    } catch (error) {
      // console.error("Error starting transaction:", error);
      throw error;
    }
  }

  async commitTransaction() {
    try {
      await database.runQuery("COMMIT");
      return "Transaction committed";
    } catch (error) {
      // console.error("Error committing transaction:", error);
      throw error;
    }
  }

  async rollbackTransaction() {
    try {
      await database.runQuery("ROLLBACK");

      return "Transaction rolled back";
    } catch (error) {
      // console.error("Error rolling back transaction:", error);
      throw error;
    }
  }
}

const transactionManager = new TransactionManager();
module.exports = transactionManager;
