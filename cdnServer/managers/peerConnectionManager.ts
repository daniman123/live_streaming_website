const { RTCPeerConnection, RTCSessionDescription } = require("wrtc");
import { configuration } from "../constants/constants";

class PeerConnectionManager {
  private config: RTCConfiguration;

  constructor() {
    this.config = configuration;
  }

  public createPeerConnection(): RTCPeerConnection {
    return new RTCPeerConnection(this.config);
  }
}

export = PeerConnectionManager;
