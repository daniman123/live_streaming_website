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
    try {
      await transactionManager.startTransaction();

      const errors = [];
      const input = inputValidation.sanitizeInput(username, email, password);

      const isUsernameValid = inputValidation.validateUsername(input.username);
      if (isUsernameValid) {
        errors.push(isUsernameValid);
      }
      const isEmailValid = inputValidation.validateEmail(input.email);
      if (isEmailValid) {
        errors.push(isEmailValid);
      }
      const isPasswordValid = inputValidation.validatePassword(input.password);
      if (isPasswordValid) {
        errors.push(isPasswordValid);
      }
      const isUsernameDuplicate = await checkDuplicates(
        "User",
        "username",
        input.username
      );
      if (isUsernameDuplicate) {
        errors.push(isUsernameDuplicate);
      }
      const isEmailDuplicate = await checkDuplicates(
        "User",
        "email",
        input.email
      );
      if (isEmailDuplicate) {
        errors.push(isEmailDuplicate);
      }

      if (errors.length > 0) {
        await transactionManager.rollbackTransaction();
        return { errors };
      }

      const sql = `
        INSERT INTO User (username, email, password, created_at, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
      const params = [input.username, input.email, input.password];
      const result = await database.get(sql, params);
      const { lastID } = result;
      await transactionManager.commitTransaction();

      return new User(
        lastID,
        input.username,
        input.email,
        input.password,
        new Date(),
        new Date()
      );
    } catch (error) {
      await transactionManager.rollbackTransaction();
      return { error: `Error creating user: ${error.message}` };
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
