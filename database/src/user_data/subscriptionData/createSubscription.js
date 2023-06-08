const db = require("../../utils/db");

function createSubscription(
  subscriberId,
  subscribedToId,
  subscriptionDuration,
  subscriptionTier
) {
  const query = `
    INSERT INTO Subscription (subscriber_id, subscribed_to_id, subscription_duration, subscription_tier)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    subscriberId,
    subscribedToId,
    subscriptionDuration,
    subscriptionTier,
  ];

  return db.runQuery(query, params);
}

const subscriberId = 1; // ID of the subscribing user
const subscribedToId = 2; // ID of the user being subscribed to
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
