const database = require("../database");
const transactionManager = require("../utils/transactionManager");
const checkDuplicates = require("../utils/checkDuplicates");
const InputValidation = require("../utils/inputValidation");

const inputValidation = new InputValidation();

class User {
  constructor(user_id, username, email, password, createdAt, updatedAt) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create(username, email, password) {
    try {
      await transactionManager.startTransaction();

      const errors = {
        username: null,
        email: null,
        password: null,
      };
      const input = inputValidation.sanitizeInput(username, email, password);

      const isUsernameValid = inputValidation.validateUsername(input.username);
      if (isUsernameValid) {
        errors.username = isUsernameValid;
      }
      const isEmailValid = inputValidation.validateEmail(input.email);
      if (isEmailValid) {
        errors.email = isEmailValid;
      }
      const isPasswordValid = inputValidation.validatePassword(input.password);
      if (isPasswordValid) {
        errors.password = isPasswordValid;
      }
      const isUsernameDuplicate = await checkDuplicates(
        "User",
        "username",
        input.username
      );
      if (isUsernameDuplicate && !isUsernameValid) {
        errors.username = isUsernameDuplicate;
      }
      const isEmailDuplicate = await checkDuplicates(
        "User",
        "email",
        input.email
      );
      if (isEmailDuplicate && !isEmailValid) {
        errors.email = isEmailDuplicate;
      }

      var allNull = Object.values(errors).every((value) => value === null);
      if (!allNull) {
        await transactionManager.rollbackTransaction();
        throw new Error(JSON.stringify(errors));
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
      throw new Error(error.message);
    }
  }

  static async getByUsername(username) {
    const sql = "SELECT * FROM User WHERE username = ?";
    const params = [username];

    try {
      let result = await database.get(sql, params);
      result = result[0];
      if (result) {
        return new User(
          result.user_id,
          result.username,
          result.email,
          result.password,
          result.created_at,
          result.updated_at
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  static async getById(user_id) {
    const sql = "SELECT * FROM User WHERE user_id = ?";
    const params = [user_id];

    try {
      const result = await database.get(sql, params);
      return result[0];
      if (result) {
        return new User(
          result.user_id,
          result.username,
          result.email,
          result.password,
          result.created_at,
          result.updated_at
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
      WHERE user_id = ?
    `;
    const params = [this.username, this.email, this.password, this.user_id];

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
