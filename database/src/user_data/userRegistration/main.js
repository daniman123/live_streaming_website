const InputValidator = require("./inputValidator");
const UserRepository = require("./userRepository");

async function registerNewUser(username, email, password) {
  const input = { username: username, email: email, password: password };

  try {
    const inputValidator = new InputValidator(input);
    const sanitizedInput = await inputValidator.validator();

    if (!sanitizedInput) {
      console.error("Invalid input. Please check your input.");
      return;
    }

    const userRepository = new UserRepository();
    await userRepository.insertUser(
      sanitizedInput.username,
      sanitizedInput.email,
      sanitizedInput.password
    );
  } catch (error) {
    console.error(error);
  }
}

// Example usage
registerNewUser("Vizual_swami123", "dani@gmail.com", "password123");
registerNewUser("sjeko", "filip@gmail.com", "password123");
registerNewUser("poonslayer", "gusta@gmail.com", "password123");
registerNewUser("ulebulle", "ulle@gmail.com", "password123");
registerNewUser("markkee", "hon@gmail.com", "password123");
