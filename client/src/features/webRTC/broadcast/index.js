"use client";

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { config, SIGNAL_SERVER_URL } from "../utils/config";
import SetMediaDevices from "../components/setMediaDevices/index";

import "../style/style.css";

const socket = io.connect(SIGNAL_SERVER_URL);

function Broadcast() {
  const [stream, setStream] = useState(null);
  const localStream = useRef();

  const startBroadcast = async () => {};

  useEffect(() => {
    localStream.current.srcObject = stream;
    if (stream) {
      initializeStream();
    }
  }, [stream]);

  async function initializeStream() {
    const peer = createPeer();
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  }

  const createPeer = () => {
    const peer = new RTCPeerConnection(config);
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);
    return peer;
  };

  const handleNegotiationNeededEvent = async (peer) => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    socket.emit("broadcast", payload);
    socket.on("returnPayload", (data) => {
      const desc = new RTCSessionDescription(data.sdp);
      peer.setRemoteDescription(desc).catch((error) => console.log(error));
    });
  };

  return (
    <div className="dashboard__streamer__broadcast__wrapper">
      <video
        className="dashboard__streamer__broadcast__player"
        ref={localStream}
        autoPlay
        playsInline
      />
      <div className="dashboard__stream__broadcast__options__wrapper">
        <SetMediaDevices setStream={setStream} />
        <button onClick={startBroadcast}>START BROADCAST</button>
        {/* <button onClick={disconnectBroadcast}>DISCONNECT BROADCAST</button> */}
      </div>
    </div>
  );
}

export default Broadcast;
