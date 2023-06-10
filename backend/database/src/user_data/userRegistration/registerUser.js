const TransactionManager = require("../../db/transactionManager");
const register = require("./register");
const InputValidation = require("../../db/inputValidation");
const DatabaseUtility = require("../../db/databaseUtility");

async function registerUser(username, email, password) {
  const transactionManager = new TransactionManager();
  const inputValidation = new InputValidation();
  const databaseUtility = new DatabaseUtility();

  try {
    await transactionManager.startTransaction();
    // validate user input
    const isNameValid = inputValidation.validateUsername(username);
    const isEmailValid = inputValidation.validateEmail(email);
    const isPasswordValid = inputValidation.validatePassword(password);

    if (isNameValid || isEmailValid || isPasswordValid)
      return isNameValid, isEmailValid, isPasswordValid;

    const input = inputValidation.sanitizeInput(username, email, password);
    // Perform the registration logic here
    const isNameDup = await databaseUtility.checkDuplicates(
      "User",
      "username",
      input.username
    );
    const isEmailDup = await databaseUtility.checkDuplicates(
      "User",
      "email",
      input.email
    );

    if (isNameDup || isEmailDup) return isNameDup, isEmailDup;

    await register(input);
    // If everything succeeds, commit the transaction
    await transactionManager.commitTransaction();

    return "User registration successful!";
  } catch (error) {
    // If an error occurs, rollback the transaction
    await transactionManager.rollbackTransaction();

    return "User registration failed:", error;
  }
}

// Usage example

registerUser("xysss", "xyss@gmail.com", "Password123");
