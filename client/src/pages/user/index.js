"use client";

import React from "react";

import "./style/style.css";

import VideoPlayer from "./components/videoPlayerContainer/index";
import Stream from "./components/stream/index";
import StreamTitleBanner from "./components/streamTitleBanner";

function UserFeed() {
  return (
    <div>
      <VideoPlayer />
      <StreamTitleBanner />
    </div>
  );
}

export default UserFeed;
