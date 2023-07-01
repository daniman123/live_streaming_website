"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import servers from "../../api/config/stunServerConfig";
import { io } from "socket.io-client";

const SIGNAL_SERVER_URL = "http://localhost:7000";

const socket = io.connect(SIGNAL_SERVER_URL);

function Viewer() {
  const [roomName, setRoomName] = useState("/dashboard" + usePathname());
  const [answer, setAnswer] = useState(null);

  const peerConnection = useRef();
  const remoteStream = useRef();

  useEffect(() => {
    socket.emit("joinRoom", roomName);
  }, []);

  useEffect(() => {
    socket.on("broadcastMessage", (offer) => {
      createAnswer(offer).then();
    });
  }, [socket]);

  useEffect(() => {
    if (answer) {
      socket.emit("answer", { room: roomName, answer: answer });
    }
  }, [answer]);

  const createAnswer = async (broadcastOffer) => {
    peerConnection.current = new RTCPeerConnection(servers);
    remoteStream.current.srcObject = new MediaStream();

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.srcObject.addTrack(track);
      });
    };

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        setAnswer(peerConnection.current.localDescription);
      }
    };

    if (!broadcastOffer) return alert("NOOOOOOOOOOOOOOOOO broadcastOffer");

    await peerConnection.current.setRemoteDescription(broadcastOffer);

    let answer = await peerConnection.current.createAnswer();

    await peerConnection.current.setLocalDescription(answer);
  };

  return (
    <div>
      <div className="vids">
        <video
          ref={remoteStream}
          id="remoteStream"
          autoPlay
          playsInline
          controls
        />
      </div>

      <div className="options"></div>
    </div>
  );
}

export default Viewer;
