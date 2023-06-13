"use client";
import React, { useEffect, useState } from "react";
import ActionButtons from "./components/actionButtons/index";
import ChannelsLists from "./components/channelsLists";
import { fetchFollowing } from "../../api/auth";
import "./style/style.css";

function LeftBody() {
  const [followedChannels, setFollowedChannels] = useState(null);
  const [recommendedChannels, setRecommendedChannels] = useState(null);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const data = await fetchFollowing("yoooo");

      setFollowedChannels(data);
      setRecommendedChannels(data);
    };

    fetchDataFromApi();
  }, []);

  const channels = {
    followed: {
      name: "followers__channels",
      title: "Followed channels",
      channels: followedChannels,
    },
    recommended: {
      name: "recommended__channels",
      title: "Recommended channels",
      channels: recommendedChannels,
    },
  };

  return (
    <div className="left__body">
      <div className="left__body__element">
        <ActionButtons />
      </div>
      {followedChannels && (
        <ChannelsLists
          name={channels.followed.name}
          title={channels.followed.title}
          channels={channels.followed.channels}
        />
      )}
      {recommendedChannels && (
        <ChannelsLists
          name={channels.recommended.name}
          title={channels.recommended.title}
          channels={channels.recommended.channels}
        />
      )}
    </div>
  );
}

export default LeftBody;
