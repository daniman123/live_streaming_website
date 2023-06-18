import React from "react";

const WebRTCCallButtons = ({ startCall, endCall }) => {
  return (
    <div>
      <button onClick={startCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default WebRTCCallButtons;
