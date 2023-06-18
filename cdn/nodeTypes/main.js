const ContentConsumer = require("./contentConsumer/contentConsumer");
const ContentProvider = require("./contentProvider/contentProvider");

// Create content provider and consumer objects
const provider1 = new ContentProvider("CP1");
const provider2 = new ContentProvider("CP2");
const consumer1 = new ContentConsumer("CC1");
const consumer2 = new ContentConsumer("CC2");

// Establish connections between nodes
provider1.addPeer(consumer1);
provider2.addPeer(consumer2);
consumer1.addPeer(provider1);
consumer2.addPeer(provider2);

// Example usage
const stream1 = "Stream 1";
const stream2 = "Stream 2";

// Content providers upload streams
provider1.uploadStream(stream1);
provider2.uploadStream(stream2);

// Content consumers receive streams
consumer1.receiveStream(stream1);
consumer2.receiveStream(stream2);
