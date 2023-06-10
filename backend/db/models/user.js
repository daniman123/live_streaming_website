const database = require("../database");
const transactionManager = require("../utils/transactionManager");
const checkDuplicates = require("../utils/checkDuplicates");
const InputValidation = require("../utils/inputValidation");

const inputValidation = new InputValidation();

class User {
  constructor(id, username, email, password, createdAt, updatedAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create(username, email, password) {
    const sql = `
      INSERT INTO User (username, email, password, created_at, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    try {
      await transactionManager.startTransaction();

      const isNameValid = inputValidation.validateUsername(username);
      const isEmailValid = inputValidation.validateEmail(email);
      const isPasswordValid = inputValidation.validatePassword(password);

      if (isNameValid || isEmailValid || isPasswordValid) {
        transactionManager.rollbackTransaction();
        return [isNameValid, isEmailValid, isPasswordValid].filter(Boolean);
      }

      const input = inputValidation.sanitizeInput(username, email, password);

      const isNameDup = await checkDuplicates(
        "User",
        "username",
        input.username
      );
      const isEmailDup = await checkDuplicates("User", "email", input.email);

      if (isNameDup || isEmailDup) {
        return transactionManager.rollbackTransaction();
      }
      const params = [input.username, input.email, input.password];
      const result = await database.get(sql, params);
      const { lastID } = result;
      await transactionManager.commitTransaction();
      return new User(
        lastID,
        username,
        email,
        password,
        new Date(),
        new Date()
      );
    } catch (error) {
      await transactionManager.rollbackTransaction();
      return new Error(`Error creating user: ${error.message}`);
    }
  }

  static async getById(id) {
    const sql = "SELECT * FROM User WHERE id = ?";
    const params = [id];

    try {
      const result = await database.get(sql, params);
      if (result) {
        return new User(
          result.id,
          result.username,
          result.email,
          result.password,
          new Date(result.created_at),
          new Date(result.updated_at)
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async update() {
    const sql = `
      UPDATE User
      SET username = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const params = [this.username, this.email, this.password, this.id];

    try {
      await database.runQuery(sql, params);
      this.updatedAt = new Date();
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete() {
    const sql = "DELETE FROM User WHERE id = ?";
    const params = [this.id];

    try {
      await database.runQuery(sql, params);
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = User;
