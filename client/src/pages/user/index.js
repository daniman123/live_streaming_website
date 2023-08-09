"use client";

import StreamTitleBanner from "../../features/streamTitleBanner";
import Viewer from "../../features/webRTC/viewer/index";
import Chat from "@/components/chat";
import { useTokenStore } from "../../store/tokenStore";
import { usePathname } from "next/navigation";

import "./style/style.css";
import { useMemo } from "react";

function UserFeed() {
  const username = useTokenStore((state) => state.username);
  const pathname = usePathname();
  const room = useMemo(() => {
    return "/dashboard" + pathname;
  }, [pathname]);

  return (
    <div className="stream__feed">
      <div className="stream__content">
        <div className="stream__video__feed__wrapper">
          <Viewer />
        </div>
        <StreamTitleBanner />
      </div>
      <Chat
        username={username}
        enableChat={username}
        room={room}
      />
    </div>
  );
}

export default UserFeed;
