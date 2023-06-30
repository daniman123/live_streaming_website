"use client";

import React, { useEffect, useRef } from "react";
import withFeedWrapper from "../../hoc/feedWrapper/index";
import "./style/style.css";

let servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

function Broadcast() {
  const peerConnection = useRef(); // Use useRef to declare peerConnection
  const localStream = useRef();
  const remoteStream = useRef();
  const textAreaRef = useRef();
  const textAreaRef2 = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((getLocalStream) => {
        localStream.current.srcObject = getLocalStream;
      });
  }, []);

  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection(servers);
    remoteStream.current.srcObject = new MediaStream();

    localStream.current.srcObject.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current.srcObject);
    });

    peerConnection.current.ontrack = async (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.srcObject.addTrack(track);
      });
    };

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

  const createAnswer = async () => {
    peerConnection.current = new RTCPeerConnection(servers);
    remoteStream.current.srcObject = new MediaStream();

    localStream.current.srcObject.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current.srcObject);
    });

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.srcObject.addTrack(track);
      });
    };

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        textAreaRef2.current.value = JSON.stringify(
          peerConnection.current.localDescription
        );
      }
    };

    let offer = JSON.parse(textAreaRef.current.value);

    if (!offer) return alert("NOOOOOOOOOOOOOOOOO offer");

    await peerConnection.current.setRemoteDescription(offer);

    let answer = await peerConnection.current.createAnswer();
    textAreaRef2.current.value = JSON.stringify(answer);

    await peerConnection.current.setLocalDescription(answer);
  };

  const addAnswer = async () => {
    let answer = JSON.parse(textAreaRef2.current.value);
    if (!answer) return alert("NOOOOOOOOOOOOOOOOO offer");

    if (!peerConnection.current.currentRemoteDescription) {
      peerConnection.current.setRemoteDescription(answer);
    }

    peerConnection.current.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.current.srcObject.addTrack(track);
      });
    };
  };

  return (
    <div>
      <div className="vids">
        <video ref={localStream} id="localStream" autoPlay playsInline />
        <video ref={remoteStream} id="remoteStream" autoPlay playsInline />
      </div>

      <textarea ref={textAreaRef}></textarea>
      <textarea ref={textAreaRef2}></textarea>

      <div className="options">
        <button onClick={createOffer}>createOffer</button>
        <button onClick={createAnswer}>createAnswer</button>
        <button onClick={addAnswer}>addAnswer</button>
      </div>
    </div>
  );
}

export default withFeedWrapper(Broadcast);
