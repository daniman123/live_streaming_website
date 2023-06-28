"use client";

import StreamTitleBanner from "../../features/streamTitleBanner";
import Chat from "@/components/chat";
import { useTokenStore } from "../../store/tokenStore";
import { usePathname } from "next/navigation";

import "./style/style.css";

function UserFeed() {
  const userToken = useTokenStore((state) => state.token);
  const room = usePathname();

  return (
    <div className="stream__feed">
      <div className="stream__content">
        <div className="vidia"></div>
        <StreamTitleBanner />
      </div>
      <Chat
        username={userToken?.name}
        enableChat={userToken?.name}
        room={room}
      />
    </div>
  );
}

export default UserFeed;
