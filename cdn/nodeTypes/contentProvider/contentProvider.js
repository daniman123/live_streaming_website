const Node = require("../node/node")
// const Node = require("../node/features/node copy")

class ContentProvider extends Node {
  constructor(nodeId) {
    super(nodeId);
    // Additional properties and methods specific to content providers
    this.uploadedStreams = [];
  }

  // Method to upload and stream live video content
  uploadStream(stream) {
    // Logic to upload the stream to the network and distribute it to content consumers
    this.uploadedStreams.push(stream);
    console.log(`Stream uploaded by Content Provider ${this.nodeId}`);
  }
}

module.exports = ContentProvider