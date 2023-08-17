"use client";

import StreamTitleBanner from "../../features/streamTitleBanner";
import Viewer from "../../features/webRTC/viewer/index";
import Chat from "@/components/chat";
import { useTokenStore } from "../../store/tokenStore";
import { usePathname } from "next/navigation";

import "./style/style.css";
import { useEffect, useMemo } from "react";
import { fetchData } from "@/api/utils/fetch";

function UserFeed() {
	const { setSubjectUserId } = useTokenStore();
	const username = useTokenStore((state) => state.username);
	const pathname = usePathname();
	const room = useMemo(() => {
		return "/dashboard" + pathname;
	}, [pathname]);

	useEffect(() => {
		const data = { username: pathname.slice(1) };
		const options = {
			headers: {
				"Content-Type": "application/json",
			},
			data,
		};
		const runner = async () => {
			const response = await fetchData(
				"/database-queries/channel-data",
				"post",
				options
			);
			setSubjectUserId(response);
			// console.log("🚀 ~ file: index.js:34 ~ runner ~ response:", response);
		};
		runner();
	}, []);

	return (
		<div className="stream__feed">
			<div className="stream__content">
				<div className="stream__video__feed__wrapper">
					<Viewer />
				</div>
				<StreamTitleBanner />
			</div>
			<Chat username={username} enableChat={username} room={room} />
		</div>
	);
}

export default UserFeed;
