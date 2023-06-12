"use client";

import React, { useEffect, useState } from "react";

import "./style/style.css";

import ActionButtons from "./components/actionButtons/index";
import ChannelsLists from "./components/channelsLists";

import { getFollowing } from "../../api/auth";

function LeftBody() {
  const [channels, setChannels] = useState({});

  useEffect(() => {
    getFollowing("yoooo").then((res) => {
      setChannels({
        followed: {
          name: "followers__channels",
          title: "Followed channels",
          channels: res.message,
        },
        recommended: {
          name: "recommended__channels",
          title: "Recommended channels",
          channels: res.message,
        },
      });
    });
  }, []);

  return (
    <div className="left__body">
      <div className="left__body__element">
        <ActionButtons />
      </div>
      {Object.keys(channels).map((channel, index) => (
        <ChannelsLists
          key={index}
          name={channels[channel].name}
          title={channels[channel].title}
          channels={channels[channel].channels}
        />
      ))}
    </div>
  );
}

export default LeftBody;
