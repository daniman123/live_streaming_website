"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

import { usePathname } from "next/navigation";
import { config } from "../utils/config";

import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

function Viewer() {
  const pathname = usePathname();
  const roomName = useMemo(() => {
    return "/dashboard" + pathname;
  }, [pathname]);

  const [stream, setStream] = useState(null);
  const socketConnection = useRef();
  const peerConnection = useRef();
  const remoteStream = useRef();

  const handleNegotiationNeededEvent = useCallback(async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    const payload = {
      sdp: peerConnection.current.localDescription,
    };

    socketConnection.current.emit("viewer", {
      room: roomName,
      data: payload,
    });
    socketConnection.current.on("answerViewer", (data) => {
      const desc = new RTCSessionDescription(data.sdp);
      peerConnection.current
        .setRemoteDescription(desc)
        .catch((e) => console.log(e));
    });
  }, []);

  const handleTrackEvent = useCallback((e) => {
    setStream(e.streams[0]);
  }, []);

  useEffect(() => {
    socketConnection.current = io.connect(SIGNAL_SERVER_URL);
    socketConnection.current.emit("joinRoom", roomName);

    peerConnection.current = new RTCPeerConnection(config);

    peerConnection.current.ontrack = handleTrackEvent;

    peerConnection.current.onnegotiationneeded = () =>
      handleNegotiationNeededEvent();

    peerConnection.current.addTransceiver("video", { direction: "recvonly" });
    peerConnection.current.addTransceiver("audio", { direction: "recvonly" });

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    remoteStream.current.srcObject = stream;
  }, [stream]);

  const disconnect = () => {
    socketConnection.current.emit("leaveRoom", roomName);
    socketConnection.current.disconnect();
    peerConnection.current.close();
  };

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
