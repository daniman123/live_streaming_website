"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import io from "socket.io-client";

import { config, SIGNAL_SERVER_URL } from "../utils/config";
import SetMediaDevices from "../components/setMediaDevices/index";
import StreamToggleOptions from "../components/streamToggleOptions/index";

import "../style/style.css";

function Broadcast() {
  const pathname = usePathname();
  const roomName = useMemo(() => {
    return pathname;
  }, [pathname]);

  const [onAir, setOnAir] = useState(false);
  const [isMediaConfig, setIsMediaConfig] = useState(false);
  const [stream, setStream] = useState(null);
  const socketConnection = useRef();
  const localStream = useRef();
  const peerConnection = useRef();

  useEffect(() => {
    localStream.current.srcObject = stream;
  }, [stream]);

  const startBroadcast = async () => {
    socketConnection.current = io.connect(SIGNAL_SERVER_URL);
    setOnAir(true);
    peerConnection.current = new RTCPeerConnection(config);
  };

  const terminateBroadcast = async () => {
    setOnAir(false);
    socketConnection.current.emit("terminateBroadcast");
    setStream(null);
    localStream.current.srcObject = stream;
    peerConnection.current = null;
    socketConnection.current.disconnect();
    window.location.reload();
  };

  useEffect(() => {
    if (!peerConnection.current || !isMediaConfig) return;
    peerConnection.current.onnegotiationneeded = () =>
      handleNegotiationNeededEvent();
    if (!stream) return;
    stream
      .getTracks()
      .forEach((track) => peerConnection.current.addTrack(track, stream));
  }, [peerConnection.current]);

  const handleNegotiationNeededEvent = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    const payload = {
      sdp: peerConnection.current.localDescription,
    };

    socketConnection.current.emit("broadcast", {
      room: roomName,
      data: payload,
    });

    socketConnection.current.on("returnPayload", (data) => {
      const desc = new RTCSessionDescription(data.sdp);
      peerConnection.current
        .setRemoteDescription(desc)
        .catch((error) => console.log(error));
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
        <div className="broadcast__options">
          <div className="broadcast__buttons">
            <button
              onClick={startBroadcast}
              disabled={(onAir && isMediaConfig) || stream === null}
            >
              START BROADCAST
            </button>
            <button onClick={terminateBroadcast} disabled={!onAir}>
              DISCONNECT BROADCAST
            </button>
          </div>

          {isMediaConfig && <StreamToggleOptions stream={stream} />}
          {isMediaConfig && onAir && (
            <div className="on__air">
              <div class="live-icon"></div>
              <p class="text">ON AIR</p>
            </div>
          )}
        </div>
        <div className="pre__broadcast__options">
          <SetMediaDevices
            setStream={setStream}
            setIsMediaConfig={setIsMediaConfig}
          />
        </div>
      </div>
    </div>
  );
}

export default Broadcast;
