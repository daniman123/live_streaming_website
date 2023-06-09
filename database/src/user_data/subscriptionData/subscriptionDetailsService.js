const db = require("../../utils/db");
const {
  INSERT_SUBSCRIPTION,
  INSERT_SUBSCRIPTION_DETAILS,
  SELECT_SUBSCRIPTION,
} = require("./constants/subscriptionQueries");

/**
 * The SubscriptionDetailsService class provides methods to manage subscription details.
 */
class SubscriptionDetailsService {
  /**
   * Creates subscription details for a new subscription between the subscriber and subscribedTo user.
   * @param {number} subscriberId - The ID of the subscriber user.
   * @param {number} subscribedToId - The ID of the user being subscribed to.
   * @param {string} subscriptionDate - The date when the subscription is created.
   * @param {number} subscriptionDuration - The duration of the subscription in days.
   * @param {string} subscriptionTier - The tier of the subscription.
   * @returns {Promise<void>} A Promise that resolves when the operation is completed.
   */
  static async createSubscriptionDetails(
    subscriberId,
    subscribedToId,
    subscriptionDate,
    subscriptionDuration,
    subscriptionTier
  ) {
    let insertSubscriptionParams = [subscriberId, subscribedToId];

    await db.runQuery(INSERT_SUBSCRIPTION, insertSubscriptionParams);

    const existingSubscription = await this.getSubscription(
      subscriberId,
      subscribedToId
    );
    const subscriptionId = existingSubscription.subscription_id;

    let insertDetailsParams = [
      subscriptionId,
      subscriptionDate,
      subscriptionDuration,
      subscriptionTier,
    ];
    await db.runQuery(INSERT_SUBSCRIPTION_DETAILS, insertDetailsParams);
  }

  /**
   * Updates the details of an existing subscription.
   * @param {number} subscriptionId - The ID of the subscription instance to update.
   * @param {string} subscriptionDate - The new date for the subscription.
   * @param {number} subscriptionDuration - The new duration of the subscription in days.
   * @param {string} subscriptionTier - The new tier of the subscription.
   * @returns {Promise<void>} A Promise that resolves when the operation is completed.
   */
  static async updateSubscriptionDetails(
    subscriptionId,
    subscriptionDate,
    subscriptionDuration,
    subscriptionTier
  ) {
    const updateDetailsParams = [
      subscriptionId,
      subscriptionDate,
      subscriptionDuration,
      subscriptionTier,
    ];

    await db.runQuery(INSERT_SUBSCRIPTION_DETAILS, updateDetailsParams);
  }

  static async getSubscription(subscriberId, subscribedToId) {
    const params = [subscriberId, subscribedToId];

    const subscriptions = await db.runQueryAndReturnResults(
      SELECT_SUBSCRIPTION,
      params
    );
    return subscriptions[0];
  }
}

module.exports = SubscriptionDetailsService;
