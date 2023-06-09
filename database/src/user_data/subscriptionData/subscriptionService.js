const db = require("../../utils/db");
const SubscriptionDetailsService = require("./subscriptionDetailsService");
const { SELECT_SUBSCRIPTION } = require("./constants/subscriptionQueries");

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
      const subscriptionId = existingSubscription.subscription_id;
      await SubscriptionDetailsService.updateSubscriptionDetails(
        subscriptionId,
        subscriptionDate,
        subscriptionDuration,
        subscriptionTier
      );
    } else {
      await SubscriptionDetailsService.createSubscriptionDetails(
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
    const params = [subscriberId, subscribedToId];

    const subscriptions = await db.runQueryAndReturnResults(
      SELECT_SUBSCRIPTION,
      params
    );
    return subscriptions[0];
  }
}

module.exports = SubscriptionService;
