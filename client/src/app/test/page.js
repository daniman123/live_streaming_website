"use client";

import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../components/chat/utils/index";
import ChatHeader from "../../components/chat/chatLayout/chatHeader/index";
import ChatBody from "../../components/chat/chatLayout/chatBody/index";
import ChatFooter from "../../components/chat/chatLayout/chatFooter/index";

import "../../components/chat/style/style.css";
import withFeedWrapper from "@/hoc/feedWrapper";
import { config } from "@/features/webRTC/utils/config";

function Chat({ username, enableChat, room }) {
	const socketUrl = "ws://localhost:12346";
	const socketRef = useRef(null);
	const peerRef = useRef(null);
	const chatInputRef = useRef();
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socketRef.current = new WebSocket(socketUrl);
		peerRef.current = new RTCPeerConnection(config);
		const handleOpen = async () => {
			// const payload = { join_room: "room" };
			const offer = await peerRef.current.createOffer();
			await peerRef.current.setLocalDescription(offer);
			const payload = {
				sdp: peerRef.current.localDescription,
			};

			const strPayload = JSON.stringify(payload);
			socketRef.current.send(strPayload);
		};

		socketRef.current.addEventListener("open", handleOpen);

		const handleMessage = (event) => {
			console.log("🚀 ~ file: page.js:31 ~ handleMessage ~ event:", event);
			const message = event.data;
			console.log("🚀 ~ file: index.js:21 ~ handleMessage ~ message:", message);
			const payload = JSON.parse(message);
			setMessageList((prevMessages) => [...prevMessages, payload]);
		};

		socketRef.current.addEventListener("message", handleMessage);

		return () => {
			socketRef.current.removeEventListener("message", handleMessage);
			socketRef.current.close();
		};
	}, []);

	const handleSendMessage = () => {
		sendMessage(
			socketRef.current,
			room,
			username,
			currentMessage,
			setMessageList,
			chatInputRef,
			setCurrentMessage
		);
	};

	return (
		<div className="chat__wrapper">
			<ChatHeader />
			<ChatBody messageList={messageList} showTime={false} />
			<ChatFooter
				chatInputRef={chatInputRef}
				enableChat={enableChat}
				setCurrentMessage={setCurrentMessage}
				handleSendMessage={handleSendMessage}
			/>
		</div>
	);
}

export default withFeedWrapper(Chat);
