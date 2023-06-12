const INSERT_USER = `
      INSERT INTO User (username, email, password)
      VALUES (?, ?, ?)
    `;

module.exports = {
    INSERT_USER,
};
