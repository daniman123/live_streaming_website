const db = require("../../utils/db");
const InputValidator = require("./InputValidator");
const insertUser = require("./userRepository");

const inputValidator = new InputValidator();

async function registerNewUser(username, email, password) {
  const input = { username, email, password };

  try {
    await db.startTransaction();

    const sanitizedInput = await inputValidator.validator(input);
    if (!sanitizedInput) return;

    await insertUser(
      sanitizedInput.username,
      sanitizedInput.email,
      sanitizedInput.password
    );
    await db.commitTransaction();
  } catch (error) {
    await db.rollbackTransaction();
    console.error(error);
  } finally {
    await db.close();
  }
}

module.exports = registerNewUser;
