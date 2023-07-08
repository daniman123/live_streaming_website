import React from "react";

const BroadcastButtons = ({
  isMediaConfig,
  startBroadcast,
  onAir,
  stream,
  terminateBroadcast,
}) => {
  return (
    isMediaConfig && (
      <div className="broadcast__buttons">
        <button
          className="broadcast"
          id="start"
          onClick={startBroadcast}
          disabled={(onAir && isMediaConfig) || stream === null}
        >
          START BROADCAST
        </button>
        <button
          className="broadcast"
          id="stop"
          onClick={terminateBroadcast}
          disabled={!onAir}
        >
          DISCONNECT BROADCAST
        </button>
      </div>
    )
  );
};

export default BroadcastButtons;
