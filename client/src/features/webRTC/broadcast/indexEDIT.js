"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { startBroadcast, terminateBroadcast } from "../utils/broadcastUtils";
import SetMediaDevices from "../components/setMediaDevices/index";
import BroadcastButtons from "../components/broadcastButtons/index";
import StreamToggleOptions from "../components/streamToggleOptions/index";
import Chat from "@/components/chat";
import { useTokenStore } from "../../../store/tokenStore";

import "../style/style.css";

function Broadcast() {
  const pathname = usePathname();
  const roomName = useMemo(() => {
    return pathname;
  }, [pathname]);
  const userToken = useTokenStore((state) => state.token);

  const [onAir, setOnAir] = useState(false);
  const [isMediaConfig, setIsMediaConfig] = useState(false);
  const [stream, setStream] = useState(null);
  const socketConnection = useRef();
  const localStream = useRef();
  const peerConnection = useRef();

  useEffect(() => {
    localStream.current.srcObject = stream;
  }, [stream]);

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
    <div className="dashboard__feed">
      <div className="dashboard__streamer__broadcast__wrapper">
        <video
          className="dashboard__streamer__broadcast__player"
          ref={localStream}
          autoPlay
          playsInline
          controls
        />
        <div className="dashboard__stream__broadcast__options__wrapper">
          <SetMediaDevices
            setStream={setStream}
            setIsMediaConfig={setIsMediaConfig}
          />

          <div className="broadcast__options">
            <BroadcastButtons
              isMediaConfig={isMediaConfig}
              startBroadcast={() =>
                startBroadcast(socketConnection, setOnAir, peerConnection)
              }
              onAir={onAir}
              stream={stream}
              terminateBroadcast={() =>
                terminateBroadcast(
                  setOnAir,
                  socketConnection,
                  roomName,
                  setStream,
                  localStream,
                  peerConnection
                )
              }
            />
            {isMediaConfig && <StreamToggleOptions stream={stream} />}
          </div>

          <div className="broadcast__meta__data">
            {isMediaConfig && onAir && (
              <div className="on__air">
                <div className="live-icon"></div>
                <p className="text">ON AIR</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Chat
        username={userToken?.name}
        enableChat={userToken?.name}
        room={roomName}
      />
    </div>
  );
}

export default Broadcast;
