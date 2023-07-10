

const BroadcastButtons = ({
  broadcastHandler,
  isMediaConfig,
  onAir,
  stream,
  roomName,
  setOnAir,
}) => {
  return (
    isMediaConfig && (
      <div className="broadcast__buttons">
        <button
          className="broadcast"
          id="start"
          onClick={() => broadcastHandler.start(stream, roomName, isMediaConfig, setOnAir)}
          disabled={(onAir && isMediaConfig) || stream === null}
        >
          START BROADCAST
        </button>
        <button
          className="broadcast"
          id="stop"
          onClick={() => broadcastHandler.terminate(setOnAir, roomName)}
          disabled={!onAir}
        >
          DISCONNECT BROADCAST
        </button>
      </div>
    )
  );
};

export default BroadcastButtons;
