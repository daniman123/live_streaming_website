const INSERT_FOLLOW = `
  INSERT INTO Following (follower_id, followed_id, following_date)
  VALUES (?, ?, ?)
`;

const SELECT_FOLLOW = `
  SELECT * FROM Following
  WHERE follower_id = ? AND followed_id = ?
`;

module.exports = {
  INSERT_FOLLOW,
  SELECT_FOLLOW,
};
