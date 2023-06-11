import React from "react";

import "./style/style.css";

import ActionButtons from "./components/actionButtons/index";
import ChannelsLists from "./components/channelsLists";

function LeftBody() {
  const games_array = [
    { username: "user1", category: "Fortnite", viewer_count: 1000 },
    { username: "user2", category: "Minecraft", viewer_count: 500 },
    { username: "user3", category: "League of Legends", viewer_count: 225000 },
    { username: "user4", category: "Overwatch", viewer_count: 800 },
    { username: "user5", category: "Apex Legends", viewer_count: 1200 },
  ];

  const channels = {
    followed: {
      name: "followers__channels",
      title: "Followed channels",
      channels: games_array,
    },
    recommended: {
      name: "recommended__channels",
      title: "Recommended channels",
      channels: games_array,
    },
  };

  return (
    <div className="left__body">
      <div className="left__body__element">
        <ActionButtons />
      </div>
      {Object.keys(channels).map((channel, index) => (
        <ChannelsLists
          name={channels[channel].name}
          title={channels[channel].title}
          channels={channels[channel].channels}
        />
      ))}
    </div>
  );
}

export default LeftBody;
