const registerNewUser = require("../userRegistration/registerNewUser");
const SubscriptionService = require("../subscriptionData/subscriptionService");



const users = [
  ["vizuals", "dani@gmail.com", "password123"],
  ["xqc", "felx@gmail.com", "password123"],
  ["hasl", "hasa@gmail.com", "password123"],
  ["yrg", "jsh@gmail.com", "password123"],
  ["kailer", "kai@gmail.com", "password123"],
  ["deo", "bruh@gmail.com", "password123"],
  ["miz", "kif@gmail.com", "password123"],
];

// registerNewUser(...users[3]);

const subscriberId = 1; // ID of the subscribing user
const subscribedToId = 4; // ID of the user being subscribed to
const subscriptionDate = new Date(); // Current date and time
const subscriptionDuration = 30; // Subscription duration in days
const subscriptionTier = 2; // Subscription tier (e.g., premium)

// ss = new SubscriptionService();
// ss.createSubscription(
//   subscriberId,
//   subscribedToId,
//   subscriptionDate,
//   subscriptionDuration,
//   subscriptionTier
// )
//   .then(() => {
//     console.log("Subscription created successfully");
//   })
//   .catch((error) => {
//     console.error("Failed to create subscription:", error);
//   });
