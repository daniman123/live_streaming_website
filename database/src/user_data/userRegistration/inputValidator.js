const db = require("../../utils/db");

class InputValidator {
  constructor() {
    this.db = db;
    this.tableName = "User";
  }

  async validator(input) {
    const sanitizedInput = this.sanitizeInput(input);

    const isValid = this.validateInput(sanitizedInput);
    if (!isValid) return;

    const [isUsernameDuplicate, isEmailDuplicate] = await Promise.all([
      this.checkDuplicate(this.tableName, "username", input.username),
      this.checkDuplicate(this.tableName, "email", input.email),
    ]);

    if (isUsernameDuplicate || isEmailDuplicate) return;

    return sanitizedInput;
  }

  sanitizeInput(input) {
    return this.db.sanitizeInput(input);
  }

  validateInput(inp) {
    return this.db.validateInput(inp);
  }

  checkDuplicate(tableName, field, value) {
    return this.db.checkDuplicates(tableName, field, value);
  }
}

module.exports = InputValidator;
