import io from "socket.io-client";
import { config, SIGNAL_SERVER_URL } from "./config";

class BroadcastHandler {
	socketConnection: WebSocket;
	peerConnection: RTCPeerConnection;
	constructor() {
		const socketUrl = "ws://localhost:12346";
		this.socketConnection = new WebSocket(socketUrl);
		this.peerConnection = new RTCPeerConnection(config);
	}

	async initEventHandlers() {
		const handleMessage = (event: MessageEvent) => {
			const message = event.data;
			const payload = JSON.parse(message);
			console.log(
				"🚀 ~ file: broadcastHandler.js:27 ~ BroadcastHandler ~ handleMessage ~ payload:",
				payload
			);

			const desc = new RTCSessionDescription(payload);
			this.peerConnection
				.setRemoteDescription(desc)
				.catch((error) => console.log(error));
		};
		this.socketConnection.addEventListener("message", handleMessage);
	}

	async start(
		stream: MediaStream,
		roomName: string,
		isMediaConfig: boolean,
		setOnAir: React.Dispatch<React.SetStateAction<boolean>>
	) {
		if (!this.peerConnection || !isMediaConfig) return;

		this.peerConnection.onnegotiationneeded =
			this.handleNegotiationNeededEvent.bind(this, roomName);

		if (stream) {
			stream
				.getTracks()
				.forEach((track) => this.peerConnection.addTrack(track, stream));
		}

		await this.initEventHandlers();

		setOnAir(true);
	}

	async terminate(
		setOnAir: React.Dispatch<React.SetStateAction<boolean>>,
		roomName: string
	) {
		this.peerConnection.close();
		setOnAir(false);
		this.socketConnection.send(roomName);
		this.socketConnection.close();
		window.location.reload();
	}

	async construct_payload(
		peerConnection: RTCPeerConnection,
		roomName: string
	): Promise<string> {
		const localDesc = peerConnection.localDescription;
		const payload = {
			"START BROADCAST": {
				role: "BROADCASTER",
				roomName,
				localDesc,
			},
		};
		const strPayload = JSON.stringify(payload);
		return strPayload;
	}

	async handleNegotiationNeededEvent(roomName: string) {
		const offer = await this.peerConnection.createOffer();
		await this.peerConnection.setLocalDescription(offer);
		const payload = await this.construct_payload(this.peerConnection, roomName);
		this.socketConnection.send(payload);
	}

	getViewCount(
		room: string,
		setViewCount: React.Dispatch<React.SetStateAction<boolean>>
	) {
		// this.socketConnection.emit("getViewCount", room);
		// this.socketConnection.on("concurrentViewers", (data) => {
		// 	console.log(
		// 		"🚀 ~ file: broadcastUtils.js:77 ~ socketConnection.on ~ data:",
		// 		data
		// 	);
		// 	setViewCount((prevState) => (prevState = data));
		// });
	}
}

export default BroadcastHandler;
