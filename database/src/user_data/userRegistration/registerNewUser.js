const db = require("../../utils/db");
const InputValidator = require("./InputValidator");
const UserRepository = require("./userRepository");

const inputValidator = new InputValidator();
const userRepository = new UserRepository();

async function registerNewUser(username, email, password) {
  const input = { username, email, password };

  try {
    await db.startTransaction();

    const sanitizedInput = await inputValidator.validator(input);
    if (!sanitizedInput) return;

    await userRepository.insertUser(sanitizedInput);
    await db.commitTransaction();
  } catch (error) {
    await db.rollbackTransaction();
    console.error(error);
  } finally {
    await db.close();
  }
}

module.exports = registerNewUser;

