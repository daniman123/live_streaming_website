const registerNewUser = require("../userRegistration/registerNewUser");
const createSubscription = require("../subscriptionData/createSubscription");

// registerNewUser("vizual", "dani@gmail.com", "password123");
// registerNewUser("xqc", "felx@gmail.com", "password123");
// registerNewUser("hasl", "hasa@gmail.com", "password123");
// registerNewUser("yrg", "jsh@gmail.com", "password123");
// registerNewUser("kailer", "kai@gmail.com", "password123");

const subscriberId = 4; // ID of the subscribing user
const subscribedToId = 2; // ID of the user being subscribed to
const subscriptionDate = new Date(); // Current date and time
const subscriptionDuration = 30; // Subscription duration in days
const subscriptionTier = 2; // Subscription tier (e.g., premium)

createSubscription(
  subscriberId,
  subscribedToId,
  subscriptionDate,
  subscriptionDuration,
  subscriptionTier
)
  .then(() => {
    console.log("Subscription created successfully");
  })
  .catch((error) => {
    console.error("Failed to create subscription:", error);
  });
