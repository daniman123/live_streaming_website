"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./style/style.css";
import { useGetLocalStream } from "@/lib/customHooks";
import { servers } from "../../api/config/stunServerConfig";
import io from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);

function Broadcast() {
  const [roomName, setRoomName] = useState(usePathname());
  const [offer, setOffer] = useState(null);
  const peerConnection = useRef();
  const localStream = useGetLocalStream();

  useEffect(() => {
    socket.on("joins", async (data) => {
      await createOffer();
    });
    socket.on("answerOffer", (data) => {
      addAnswer(data).then();
    });
  }, [socket]);

  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current.srcObject.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current.srcObject);
    });

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        setOffer(peerConnection.current.localDescription);
      }
    };

    let offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    await socket.emit("joinRoom", roomName);
    await socket.emit("broadcast", { room: roomName, offer: offer });
  };

  const addAnswer = async (answer) => {
    if (!answer) return alert("NOOOOOOOOOOOOOOOOO offer");

    if (!peerConnection.current.currentRemoteDescription) {
      await peerConnection.current.setRemoteDescription(answer);
    }
  };

  return (
    <div>
      <div className="vids">
        <video ref={localStream} id="localStream" autoPlay playsInline />
      </div>

      <div className="options">
        <button onClick={createOffer}>createOffer</button>
      </div>
    </div>
  );
}

export default Broadcast;
