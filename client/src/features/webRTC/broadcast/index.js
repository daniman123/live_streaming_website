"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import SetMediaDevices from "../components/setMediaDevices/index";
import VideoPlayer from "../components/videoPlayer/index";
import BroadcastMetaData from "../components/broadcastMetaData/index";
import BroadcastButtons from "../components/broadcastButtons/index";
import StreamToggleOptions from "../components/streamToggleOptions/index";
import Chat from "@/components/chat";
import { useTokenStore } from "../../../store/tokenStore";
import BroadcastHandler from "../utils/broadcastHandler";
const broadcastHandler = new BroadcastHandler();

import "../style/style.css";

function Broadcast() {
	const pathname = usePathname();
	const roomName = useMemo(() => pathname, [pathname]);
	const userToken = useTokenStore((state) => state.token);

	const [onAir, setOnAir] = useState(false);
	const [isMediaConfig, setIsMediaConfig] = useState(false);
	const [stream, setStream] = useState(null);
	const [viewCount, setViewCount] = useState(null);
	const socketRef = useRef(null);

	const localStream = useRef();

	useEffect(() => {
		localStream.current.srcObject = stream;
	}, [stream]);

	const updateViewCount = useCallback(() => {
		if (stream !== null) {
			broadcastHandler.getViewCount(roomName, setViewCount);
		}
	}, [roomName, stream]);

	useEffect(() => {
		const interval = setInterval(updateViewCount, 5000);
		return () => clearInterval(interval);
	}, [updateViewCount]);

	return (
		<div className="dashboard__feed">
			<div className="dashboard__streamer__broadcast__wrapper">
				<VideoPlayer localStream={localStream} />
				<div className="dashboard__stream__broadcast__options__wrapper">
					<SetMediaDevices
						setStream={setStream}
						setIsMediaConfig={setIsMediaConfig}
					/>
					<div className="broadcast__options">
						<BroadcastButtons
							broadcastHandler={broadcastHandler}
							isMediaConfig={isMediaConfig}
							roomName={roomName}
							setOnAir={setOnAir}
							onAir={onAir}
							stream={stream}
						/>
						{isMediaConfig && <StreamToggleOptions stream={stream} />}
					</div>

					{isMediaConfig && onAir && (
						<BroadcastMetaData viewCount={viewCount} />
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
