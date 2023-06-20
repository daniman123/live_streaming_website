const TABLES = {
  USER_TABLE: {
    NAME: "User",
    DEFINITION: `
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      `,
  },
  USER_TOKEN_TABLE: {
    NAME: "Tokens",
    DEFINITION: `
        token_id INTEGER PRIMARY KEY AUTOINCREMENT,
        token VARCHAR(255),
        username VARCHAR(255) NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      `,
  },
  FOLLOWING_TABLE: {
    NAME: "Following",
    DEFINITION: `
        follow_id INTEGER PRIMARY KEY AUTOINCREMENT,
        follower_id INTEGER,
        followed_id INTEGER,
        following_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (follower_id) REFERENCES User(user_id),
        FOREIGN KEY (followed_id) REFERENCES User(user_id)
      `,
  },
  SUBSCRIPTION_TABLE: {
    NAME: "Subscription",
    DEFINITION: `
        subscription_id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscriber_id INTEGER,
        subscribed_to_id INTEGER,
        FOREIGN KEY (subscriber_id) REFERENCES User(user_id),
        FOREIGN KEY (subscribed_to_id) REFERENCES User(user_id)
      `,
  },
  SUBCRIPTION_DETAILS_TABLE: {
    NAME: "Subscription_details",
    DEFINITION: `
        subscription_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscription_instance INTEGER,
        subscription_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        subscription_duration INTEGER,
        subscription_tier INTEGER,
        FOREIGN KEY (subscription_detail_id) REFERENCES Subscription(subscription_id)
      `,
  },
};

module.exports = TABLES;
