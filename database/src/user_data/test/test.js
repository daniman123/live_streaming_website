const registerNewUser = require("../userRegistration/registerNewUser");
const SubscriptionService = require("../subscriptionData/subscriptionService");

// registerNewUser("vizual", "dani@gmail.com", "password123");
// registerNewUser("xqc", "felx@gmail.com", "password123");
// registerNewUser("hasl", "hasa@gmail.com", "password123");
// registerNewUser("yrg", "jsh@gmail.com", "password123");
// registerNewUser("kailer", "kai@gmail.com", "password123");
// registerNewUser("deo", "bruh@gmail.com", "password123");
// registerNewUser("miz", "kif@gmail.com", "password123");

const subscriberId = 7; // ID of the subscribing user
const subscribedToId = 6; // ID of the user being subscribed to
const subscriptionDate = new Date(); // Current date and time
const subscriptionDuration = 30; // Subscription duration in days
const subscriptionTier = 2; // Subscription tier (e.g., premium)

ss = new SubscriptionService();
ss.createSubscription(
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
