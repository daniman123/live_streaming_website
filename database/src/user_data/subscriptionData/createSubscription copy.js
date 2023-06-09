const db = require("../../utils/db");

async function createSubscription(
  subscriberId,
  subscribedToId,
  subscriptionDate,
  subscriptionDuration,
  subscriptionTier
) {
  // Check if a subscription already exists for the subscriber and subscribedToId
  const existingSubscription = await getSubscriptionBySubscriberAndSubscribedTo(
    subscriberId,
    subscribedToId
  );

  if (existingSubscription) {
    const currentDuration = existingSubscription.subscription_duration;

    // Add 30 days to the existing subscription duration
    const updatedDuration = currentDuration + 30;

    // Update the existing subscription with the new duration
    const query = `
      UPDATE Subscription
      SET subscription_duration = ?
      WHERE subscriber_id = ? AND subscribed_to_id = ?
    `;
    const params = [updatedDuration, subscriberId, subscribedToId];

    await db.runQuery(query, params);
  } else {
    // Create a new subscription
    const query = `
      INSERT INTO Subscription (subscriber_id, subscribed_to_id, subscription_date, subscription_duration, subscription_tier)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      subscriberId,
      subscribedToId,
      subscriptionDate,
      subscriptionDuration,
      subscriptionTier,
    ];

    await db.runQuery(query, params);
  }
}

async function getSubscriptionBySubscriberAndSubscribedTo(
  subscriberId,
  subscribedToId
) {
  const query = `
    SELECT * FROM Subscription
    WHERE subscriber_id = ? AND subscribed_to_id = ?
  `;
  const params = [subscriberId, subscribedToId];

  const subscriptions = await db.runQueryAndReturnResults(query, params);
  return subscriptions[0];
}

module.exports = createSubscription;
