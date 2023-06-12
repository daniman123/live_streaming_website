class InputValidation {
  validateUsername(username) {
    if (!username)
      return "Username length should be between 3 and 20 characters.";
    if (username.length < 3 || username.length > 20) {
      return "Username length should be between 3 and 20 characters.";
    }
    return null; // Username is valid
  }

  validateEmail(email) {
    if (!email) return "Invalid email format.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    return null; // Email is valid
  }

  validatePassword(password) {
    if (!password) return "Password should be at least 8 characters long.";

    if (password.length < 8) {
      return "Password should be at least 8 characters long.";
    }
    // Additional password strength checks can be implemented here
    return null; // Password is valid
  }

  sanitizeInput(username, email, password) {
    // Sanitize the input values
    const sanitizedInput = {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password, // No sanitization for passwords
    };

    return sanitizedInput;
  }
}

module.exports = InputValidation;
