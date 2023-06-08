const db = require("../utils/db");

// Define an array of table names and definitions
const tables = [
  {
    name: "users",
    definition: `
      id INTEGER PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    `,
  },
  {
    name: "Channels",
    definition: `
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES Users (id)
    `,
  },
  {
    name: "Subscriptions",
    definition: `
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      channel_id INTEGER,
      tier INTEGER,
      start_date TEXT,
      end_date TEXT,
      FOREIGN KEY (user_id) REFERENCES Users (id),
      FOREIGN KEY (channel_id) REFERENCES Channels (id)
    `,
  },
  {
    name: "Payments",
    definition: `
      id INTEGER PRIMARY KEY,
      subscription_id INTEGER,
      amount REAL,
      payment_date TEXT,
      FOREIGN KEY (subscription_id) REFERENCES Subscriptions (id)
    `,
  },
];

// Loop over the array and create tables
tables.forEach((table) => {
  db.createTable(table.name, table.definition).then();
});

// Close the database connection after all table creations are done
// db.close();
