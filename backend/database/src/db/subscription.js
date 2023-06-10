const dbConnection = require("./databaseConnection");

class Subscription {
  async getSubscription(subscriberId, subscribedToId) {
    const params = [subscriberId, subscribedToId];
    const subscriptions = await dbConnection.runQueryAndReturnResults(
      SELECT_SUBSCRIPTION,
      params
    );
    return subscriptions[0];
  }
}

module.exports = new Subscription();
