const dbConnection = require("./databaseConnection");

async function getSubscription(subscriberId, subscribedToId) {
  const params = [subscriberId, subscribedToId];
  const subscriptions = await dbConnection.get(SELECT_SUBSCRIPTION, params);
  return subscriptions[0];
}

module.exports = { getSubscription };
