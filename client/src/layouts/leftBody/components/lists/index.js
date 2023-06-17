"use client";

import React from "react";
import ChannelsLists from "../../../../features/channelsLists/index";
import { useTokenStore } from "@/store/tokenStore";
import { useEffect, useState } from "react";
import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";

const Lists = () => {
  const [followed, setFollowed] = useState("");
  const [recommended, setRecommended] = useState("");
  const { token, setToken } = useTokenStore();

  const channels = {
    followed: {
      name: "followers__channels",
      title: "Followed channels",
      channels: followed,
    },
    recommended: {
      name: "recommended__channels",
      title: "Recommended channels",
      channels: recommended,
    },
  };

  useEffect(() => {
    if (token !== null) {
      postFollowing("gab", token).then((res) => {
        console.log("🚀 ~ file: index.js:20 ~ postFollowing ~ res:", res);
        setFollowed(res);
      });
    }
    console.log("🚀 ~ file: index.js:23 ~ useEffect ~ channels:", channels);
    getRecommended().then((res) => setRecommended(res));
  }, [token]);

  return (
    <div>
      {followed && (
        <ChannelsLists
          name={channels.followed.name}
          title={channels.followed.title}
          channels={channels.followed.channels}
        />
      )}
      {recommended && (
        <ChannelsLists
          name={channels.recommended.name}
          title={channels.recommended.title}
          channels={channels.recommended.channels}
        />
      )}
    </div>
  );
};

export default Lists;
