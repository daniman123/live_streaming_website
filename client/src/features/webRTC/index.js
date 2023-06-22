"use client";

import React from "react";
import WebRTCVideo from "./components/WebRTCVideo";
import WebRTCCallButtons from "./components/WebRTCCallButtons";
import { useWebRTC } from "./utils/useWebRTC";

const WebRTC = () => {
  const { videoRef, startCall, endCall } = useWebRTC(12);

  return (
    <div>
      <WebRTCVideo videoRef={videoRef} />
      <WebRTCCallButtons startCall={startCall} endCall={endCall} />
    </div>
  );
};

export default WebRTC;
