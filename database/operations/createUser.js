const User = require("../models/user");

async function createUser(username, email, password) {
  let newUser;
  try {
    newUser = await User.create(username, email, password);
    return newUser;
  } catch (error) {
    return newUser;
  }
}

createUser("bhbib ", "szam@d.com", "133frgrr").then((user) => {
  if (user instanceof User) {
    // User creation was successful
    // Access the user properties
    console.log(user);
  } else {
    // User creation failed due to validation or duplicate errors
    // Handle the errors
    console.log(user);
  }
});

module.exports = createUser;
