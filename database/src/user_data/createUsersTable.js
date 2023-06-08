const db = require("../utils/db");

const tables = [
  {
    name: "User",
    definition: `
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      subscription_date DATETIME,
      subscription_duration INTEGER,
      subscription_tier INTEGER,
      FOREIGN KEY (subscriber_id) REFERENCES User(id),
      FOREIGN KEY (subscribed_to_id) REFERENCES User(id)
    `,
  },
];

// Loop over the array and create tables
tables.forEach((table) => {
  db.createTable(table.name, table.definition).then();
});

