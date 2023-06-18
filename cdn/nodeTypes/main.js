const ContentConsumer = require("./contentConsumer/contentConsumer");
const ContentProvider = require("./contentProvider/contentProvider");

// Create an array to hold content provider and consumer objects
const providers = [];
const consumers = [];

// Define the desired number of providers and consumers
const numProviders = 7;
const numConsumers = 350000;

// Create content provider objects
for (let i = 1; i <= numProviders; i++) {
  providers.push(new ContentProvider(`CP${i}`));
}

// Create content consumer objects
for (let i = 1; i <= numConsumers; i++) {
  consumers.push(new ContentConsumer(`CC${i}`));
}

// Establish connections between nodes
providers.forEach((provider, index) => {
  const consumer = consumers[index % numConsumers]; // Distribute consumers evenly
  provider.addPeer(consumer);
  consumer.addPeer(provider);
});

// Example usage
const streams = ["Stream 1", "Stream 2", "Stream 3", "Stream 4"];

// Content providers upload streams
providers.forEach((provider, index) => {
  const stream = streams[index % streams.length]; // Distribute streams evenly
  provider.uploadStream(stream);
});

// Content consumers receive streams
consumers.forEach((consumer, index) => {
  const stream = streams[index % streams.length]; // Distribute streams evenly
  consumer.receiveStream(stream);
});
