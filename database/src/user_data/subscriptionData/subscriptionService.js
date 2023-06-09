const db = require("../../utils/db");
const SubscriptionDetails = require("./subscriptionDetails");

/**
 * The SubscriptionService class provides methods to manage subscriptions for a live streaming website.
 */
class SubscriptionService {
  /**
   * Creates a new subscription or updates an existing subscription.
   * If a subscription between the subscriber and subscribedTo user already exists,
   * the subscription details are updated with the new values.
   * If there is no existing subscription, a new subscription is created.
   * @param {number} subscriberId - The ID of the subscriber user.
   * @param {number} subscribedToId - The ID of the user being subscribed to.
   * @param {string} subscriptionDate - The date when the subscription is created or updated.
   * @param {number} subscriptionDuration - The duration of the subscription in days.
   * @param {string} subscriptionTier - The tier of the subscription.
   */
  async createSubscription(
    subscriberId,
    subscribedToId,
    subscriptionDate,
    subscriptionDuration,
    subscriptionTier
  ) {
    let existingSubscription = await this.getSubscription(
      subscriberId,
      subscribedToId
    );

    if (existingSubscription) {
      const subId = existingSubscription.subscription_id;
      await SubscriptionDetails.updateSubscription(
        subId,
        subscriptionDate,
        subscriptionDuration,
        subscriptionTier
      );
    } else {
      await SubscriptionDetails.createNewSubscription(
        subscriberId,
        subscribedToId,
        subscriptionDate,
        subscriptionDuration,
        subscriptionTier
      );
    }
  }

  /**
   * Retrieves a subscription between the subscriber and subscribedTo user.
   * @param {number} subscriberId - The ID of the subscriber user.
   * @param {number} subscribedToId - The ID of the user being subscribed to.
   * @returns {Object} The subscription object if found, otherwise null.
   */
  async getSubscription(subscriberId, subscribedToId) {
    const query = `
      SELECT * FROM Subscription
      WHERE subscriber_id = ? AND subscribed_to_id = ?
    `;
    const params = [subscriberId, subscribedToId];

    const subscriptions = await db.runQueryAndReturnResults(query, params);
    return subscriptions[0];
  }
}

module.exports = SubscriptionService;

