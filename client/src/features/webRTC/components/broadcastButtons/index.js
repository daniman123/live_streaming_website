import { startBroadcast, terminateBroadcast } from "../../utils/broadcastUtils";
const BroadcastButtons = ({
  isMediaConfig,
  onAir,
  stream,
  peerConnection,
  roomName,
  setOnAir,
}) => {
  return (
    isMediaConfig && (
      <div className="broadcast__buttons">
        <button
          className="broadcast"
          id="start"
          onClick={() =>
            startBroadcast(
              peerConnection.current,
              stream,
              roomName,
              isMediaConfig,
              setOnAir
            )
          }
          disabled={(onAir && isMediaConfig) || stream === null}
        >
          START BROADCAST
        </button>
        <button
          className="broadcast"
          id="stop"
          onClick={() =>
            terminateBroadcast(peerConnection.current, setOnAir, roomName)
          }
          disabled={!onAir}
        >
          DISCONNECT BROADCAST
        </button>
      </div>
    )
  );
};

export default BroadcastButtons;
