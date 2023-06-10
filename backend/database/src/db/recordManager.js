const DatabaseConnection = require("./databaseConnection");

class RecordManager extends DatabaseConnection {
  async updateRecord(table, id, newData) {
    const columns = Object.keys(newData);
    const values = Object.values(newData);
    const placeholders = columns.map((column) => `${column} = ?`).join(", ");
    const query = `UPDATE ${table} SET ${placeholders} WHERE id = ?`;
    const params = [...values, id];

    try {
      await this.runQuery(query, params);
      console.log("Record updated successfully.");
    } catch (error) {
      throw new Error("Error updating record: " + error.message);
    }
  }

  async deleteRecord(table, id) {
    const query = `DELETE FROM ${table} WHERE id = ?`;

    try {
      await this.runQuery(query, id);
      console.log("Record deleted successfully.");
    } catch (error) {
      throw new Error("Error deleting record: " + error.message);
    }
  }
}

module.exports = RecordManager;
