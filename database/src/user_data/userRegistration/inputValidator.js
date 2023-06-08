const db = require("../../utils/db");

class InputValidator {
  constructor(input) {
    this.db = db;
    this.tableName = "User";
    this.input = input;
  }

  async validator() {
    const sanitizedInput = this.sanitizeInput();

    const isValid = await this.validateInput(sanitizedInput);
    if (!isValid) return;

    const [isUsernameDuplicate, isEmailDuplicate] = await Promise.all([
      this.checkDuplicate(this.tableName, "username", this.input.username),
      this.checkDuplicate(this.tableName, "email", this.input.email),
    ]);

    if (isUsernameDuplicate || isEmailDuplicate) return;

    return sanitizedInput;
  }

  sanitizeInput() {
    return this.db.sanitizeInput(this.input);
  }

  validateInput(inp) {
    return this.db.validateInput(inp);
  }

  checkDuplicate(tableName, field, value) {
    return this.db.checkDuplicates(tableName, field, value);
  }
}

module.exports = InputValidator;
