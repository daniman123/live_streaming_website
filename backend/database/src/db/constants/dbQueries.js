const SELECT_SUBSCRIPTION = `
  SELECT * FROM Subscription
  WHERE subscriber_id = ? AND subscribed_to_id = ?
`;

module.exports = {SELECT_SUBSCRIPTION};
