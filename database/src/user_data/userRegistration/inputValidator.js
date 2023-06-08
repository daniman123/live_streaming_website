const db = require("../../utils/db");

class InputValidator {
  constructor(input) {
    this.db = db;
    this.tableName = "User";
    this.input = input;
  }

  sanitizeInput() {
    return this.db.sanitizeInput(this.input);
  }

  validateInput(inp) {
    return this.db.validateInput(inp);
  }

  // Check for duplicates
  usernameDuplicate() {
    return this.db.checkDuplicates(
      this.tableName,
      "username",
      this.input.username
    );
  }

  emailDuplicate() {
    return this.db.checkDuplicates(this.tableName, "email", this.input.email);
  }

  async validator() {
    const sanitizedInput = this.sanitizeInput();

    const isValidateInput = this.validateInput(sanitizedInput);
    if (!isValidateInput) return;

    const isUsernameDuplicate = await this.usernameDuplicate();
    if (isUsernameDuplicate) return;

    const isEmailDuplicate = await this.emailDuplicate();
    if (isEmailDuplicate) return;

    return sanitizedInput;
  }
}

module.exports = InputValidator;
