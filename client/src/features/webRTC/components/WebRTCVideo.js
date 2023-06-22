import React from "react";

const WebRTCVideo = ({ videoRef }) => {
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />;
    </div>
  );
};

export default WebRTCVideo;
