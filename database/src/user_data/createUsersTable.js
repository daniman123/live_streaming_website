const db = require("../utils/db");

const tables = [
  {
    name: "User",
    definition: `
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    `,
  },
  {
    name: "Subscription",
    definition: `
      subscription_id INTEGER PRIMARY KEY AUTOINCREMENT,
      subscriber_id INTEGER,
      subscribed_to_id INTEGER,
      FOREIGN KEY (subscriber_id) REFERENCES User(user_id),
      FOREIGN KEY (subscribed_to_id) REFERENCES User(user_id)
    `,
  },
  {
    name: "Subscription_details",
    definition: `
      subscription_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
      subscription_instance INTEGER,
      subscription_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      subscription_duration INTEGER,
      subscription_tier INTEGER,
      FOREIGN KEY (subscription_detail_id) REFERENCES Subscription(subscription_id)
    `,
  },
];

// Loop over the array and create tables
tables.forEach(async (table) => {
  await db.createTable(table.name, table.definition);
});

db.close().then();
