const db = require("../../utils/db");

async function createSubscription(
  subscriberId,
  subscribedToId,
  subscriptionDate,
  subscriptionDuration,
  subscriptionTier
) {
  // Check if a subscription already exists for the subscriber and subscribedToId
  let existingSubscription = await getSubscriptionBySubscriberAndSubscribedTo(
    subscriberId,
    subscribedToId
  );

  if (existingSubscription) {
    const subId = existingSubscription.subscription_id;

    // Update the existing subscription with the new duration
    const query = `
        INSERT INTO Subscription_details (subscription_instance,subscription_date, subscription_duration, subscription_tier)
        VALUES (?,?,?,?) 
    `;
    params = [subId, subscriptionDate, 30, subscriptionTier];

    await db.runQuery(query, params);
  } else {
    // Create a new subscription
    let query = `
      INSERT INTO Subscription (subscriber_id, subscribed_to_id)
      VALUES (?, ?)
    `;
    let params = [subscriberId, subscribedToId];

    await db.runQuery(query, params);

    const existingSubscription =
      await getSubscriptionBySubscriberAndSubscribedTo(
        subscriberId,
        subscribedToId
      );
    subId = existingSubscription.subscription_id;
    query = `
      INSERT INTO Subscription_details (subscription_instance,subscription_date, subscription_duration, subscription_tier)
      VALUES (?,?,?,?)
    `;
    params = [subId, subscriptionDate, subscriptionDuration, subscriptionTier];
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

async function getSubscriptionDuration(subscriberId) {
  const query = `
      SELECT * FROM Subscription_details
      WHERE subscription_detail_id = ? 
    `;
  const params = [subscriberId];

  const subscriptions = await db.runQueryAndReturnResults(query, params);
  return subscriptions[0];
}

module.exports = createSubscription;
