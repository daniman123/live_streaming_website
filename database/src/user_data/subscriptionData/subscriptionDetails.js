const db = require("../../utils/db");

/**
 * The SubscriptionDetails class provides methods to manage subscription details.
 */
class SubscriptionDetails {
  /**
   * Creates a new subscription between the subscriber and subscribedTo user.
   * @param {number} subscriberId - The ID of the subscriber user.
   * @param {number} subscribedToId - The ID of the user being subscribed to.
   * @param {string} subscriptionDate - The date when the subscription is created.
   * @param {number} subscriptionDuration - The duration of the subscription in days.
   * @param {string} subscriptionTier - The tier of the subscription.
   */
  static async createNewSubscription(
    subscriberId,
    subscribedToId,
    subscriptionDate,
    subscriptionDuration,
    subscriptionTier
  ) {
    let query = `
      INSERT INTO Subscription (subscriber_id, subscribed_to_id)
      VALUES (?, ?)
    `;
    let params = [subscriberId, subscribedToId];

    await db.runQuery(query, params);

    const existingSubscription = await SubscriptionService.getSubscription(
      subscriberId,
      subscribedToId
    );
    const subId = existingSubscription.subscription_id;

    query = `
      INSERT INTO Subscription_details (subscription_instance,subscription_date, subscription_duration, subscription_tier)
      VALUES (?,?,?,?)
    `;
    params = [subId, subscriptionDate, subscriptionDuration, subscriptionTier];
    await db.runQuery(query, params);
  }

  /**
   * Updates the details of an existing subscription.
   * @param {number} subId - The ID of the subscription instance to update.
   * @param {string} subscriptionDate - The new date for the subscription.
   * @param {number} subscriptionDuration - The new duration of the subscription in days.
   * @param {string} subscriptionTier - The new tier of the subscription.
   */
  static async updateSubscription(
    subId,
    subscriptionDate,
    subscriptionDuration,
    subscriptionTier
  ) {
    const query = `
      INSERT INTO Subscription_details (subscription_instance,subscription_date, subscription_duration, subscription_tier)
      VALUES (?,?,?,?) 
    `;
    const params = [
      subId,
      subscriptionDate,
      subscriptionDuration,
      subscriptionTier,
    ];

    await db.runQuery(query, params);
  }
}

module.exports = SubscriptionDetails;
