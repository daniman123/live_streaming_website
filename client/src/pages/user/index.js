"use client";

import React from "react";

import "./style/style.css";

import VideoPlayer from "./components/videoPlayerContainer/index";
import Stream from "./components/stream/index";
import StreamTitleBanner from "./components/streamTitleBanner";
import Viewer from "./components/viewer";

function UserFeed() {
  return (
    <div className="stream_content">
      {/* <Viewer /> */}
      <StreamTitleBanner />
    </div>
  );
}

export default UserFeed;
