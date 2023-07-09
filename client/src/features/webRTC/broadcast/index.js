"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { config } from "../utils/config";
import {
  startBroadcast,
  terminateBroadcast,
  getViewCount,
} from "../utils/broadcastUtils";
import SetMediaDevices from "../components/setMediaDevices/index";
import BroadcastButtons from "../components/broadcastButtons/index";
import StreamToggleOptions from "../components/streamToggleOptions/index";
import Chat from "@/components/chat";
import { useTokenStore } from "../../../store/tokenStore";

import "../style/style.css";

function Broadcast() {
  const pathname = usePathname();
  const roomName = useMemo(() => pathname, [pathname]);
  const userToken = useTokenStore((state) => state.token);

  const [onAir, setOnAir] = useState(false);
  const [isMediaConfig, setIsMediaConfig] = useState(false);
  const [stream, setStream] = useState(null);
  const [viewCount, setViewCount] = useState(null);
  const localStream = useRef();
  const peerConnection = useRef(new RTCPeerConnection(config));

  useEffect(() => {
    localStream.current.srcObject = stream;
  }, [stream]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (stream !== null) {
        getViewCount(roomName, setViewCount);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [stream]);

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
                startBroadcast(
                  peerConnection.current,
                  stream,
                  roomName,
                  isMediaConfig,
                  setOnAir
                )
              }
              onAir={onAir}
              stream={stream}
              terminateBroadcast={() =>
                terminateBroadcast(peerConnection.current, setOnAir, roomName)
              }
            />
            {isMediaConfig && <StreamToggleOptions stream={stream} />}
          </div>

          {isMediaConfig && onAir && (
            <>
              <div className="broadcast__meta__data">
                <div className="on__air">
                  <div className="live-icon"></div>
                  <p className="text">ON AIR</p>
                </div>

                <div>
                  <p>TOTAL VIEWERS:{viewCount}</p>
                </div>
              </div>
            </>
          )}
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
