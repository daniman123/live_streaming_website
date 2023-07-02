"use client";

import React, { useEffect, useRef } from "react";
import config from "../utils/config";

import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);
function Viewer() {
  const remoteStream = useRef();

  function createPeer() {
    const peer = new RTCPeerConnection(config);
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    socket.emit("viewer", payload);
    socket.on("answerViewer", (data) => {
      const desc = new RTCSessionDescription(data.sdp);
      peer.setRemoteDescription(desc).catch((e) => console.log(e));
    });
  }

  function handleTrackEvent(e) {
    if (remoteStream.current) {
      remoteStream.current.srcObject = e.streams[0];
    }
  }

  useEffect(() => {
    async function initializeStream() {
      const peer = createPeer();
      peer.addTransceiver("video", { direction: "recvonly" });
      peer.addTransceiver("audio", { direction: "recvonly" });
    }
    initializeStream();
  }, []);

  return (
    <div className="stream__video__feed">
      <video
        className="stream__video__feed__player"
        ref={remoteStream}
        autoPlay
        playsInline
        controls
      />
    </div>
  );
}

export default Viewer;
