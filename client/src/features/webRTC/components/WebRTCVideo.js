import React from "react";

const WebRTCVideo = ({ videoRef }) => {
  return <video ref={videoRef} autoPlay playsInline />;
};

export default WebRTCVideo;
