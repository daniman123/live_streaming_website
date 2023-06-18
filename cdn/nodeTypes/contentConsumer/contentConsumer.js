const Node = require("../node/node");

class ContentConsumer extends Node {
  constructor(nodeId) {
    super(nodeId);
    // Additional properties and methods specific to content consumers
    this.receivedStreams = [];
  }

  // Method to receive and deliver live video streams
  receiveStream(stream) {
    // Logic to receive the stream from content providers and deliver it to viewers
    this.receivedStreams.push(stream);
    console.log(`Stream received by Content Consumer ${this.nodeId}`);
  }
}

module.exports = ContentConsumer;
