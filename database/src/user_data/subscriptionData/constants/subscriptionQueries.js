const INSERT_SUBSCRIPTION = `
  INSERT INTO Subscription (subscriber_id, subscribed_to_id)
  VALUES (?, ?)
`;

const INSERT_SUBSCRIPTION_DETAILS = `
  INSERT INTO Subscription_details (subscription_instance, subscription_date, subscription_duration, subscription_tier)
  VALUES (?, ?, ?, ?)
`;

const SELECT_SUBSCRIPTION = `
  SELECT * FROM Subscription
  WHERE subscriber_id = ? AND subscribed_to_id = ?
`;

module.exports = {
  INSERT_SUBSCRIPTION,
  INSERT_SUBSCRIPTION_DETAILS,
  SELECT_SUBSCRIPTION,
};
