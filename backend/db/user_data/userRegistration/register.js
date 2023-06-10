const DatabaseConnection = require("../../db/databaseConnection");
const { INSERT_USER } = require("./constants/userRegistrationQueries");

// Assuming you have an instance of the DatabaseConnection class
const databaseConnection = new DatabaseConnection();

async function register(input) {
  values = [input.username, input.email, input.password];
  try {
    await databaseConnection.runQuery(INSERT_USER, values);
    console.log("New user inserted successfully.");
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

module.exports = register;
