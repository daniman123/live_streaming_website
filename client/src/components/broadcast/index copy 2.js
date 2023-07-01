"use client";

import React, { useEffect, useRef } from "react";
import "./style/style.css";
import { useGetLocalStream } from "@/lib/customHooks";
import servers from "../../api/config/stunServerConfig";

function Broadcast() {
  const peerConnection = useRef();
  const localStream = useGetLocalStream();
  const textAreaRef = useRef();
  const textAreaRef2 = useRef();

  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection(servers);

    localStream.current.srcObject.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current.srcObject);
    });

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        textAreaRef.current.value = JSON.stringify(
          peerConnection.current.localDescription
        );
      }
    };

    let offer = await peerConnection.current.createOffer();
    textAreaRef.current.value = JSON.stringify(offer);
    await peerConnection.current.setLocalDescription(offer);
  };

  const addAnswer = async () => {
    let answer = JSON.parse(textAreaRef2.current.value);
    if (!answer) return alert("NOOOOOOOOOOOOOOOOO offer");

    if (!peerConnection.current.currentRemoteDescription) {
      peerConnection.current.setRemoteDescription(answer);
    }
  };

  return (
    <div>
      <div className="vids">
        <video ref={localStream} id="localStream" autoPlay playsInline />
      </div>

      <textarea ref={textAreaRef}></textarea>
      <textarea ref={textAreaRef2}></textarea>

      <div className="options">
        <button onClick={createOffer}>createOffer</button>
        <button onClick={addAnswer}>addAnswer</button>
      </div>
    </div>
  );
}

export default Broadcast;
