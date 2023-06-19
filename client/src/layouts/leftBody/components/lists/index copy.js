"use client";

import React, { useEffect, useState } from "react";
import ChannelsLists from "../../../../features/channelsLists/index";
import { useTokenStore } from "@/store/tokenStore";
import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";
import useFetch from "../../../../api/utils/useFetch";

const Lists = () => {
  const { token, username } = useTokenStore((state) => state);
  const [recommendedChannels, setRecommendedChannels] = useState(null);

  const { data, loading, error } = useFetch(postFollowing, username, token);

  useEffect(() => {
    getRecommended().then((res) => {
      setRecommendedChannels(res);
    });
  }, []);

  const renderChannelsLists = (name, title, channels) => {
    return <ChannelsLists name={name} title={title} channels={channels} />;
  };

  return (
    <div>
      {data &&
        renderChannelsLists(
          "followers__channels",
          "Followed channels",
          data
        )}
      {recommendedChannels &&
        renderChannelsLists(
          "recommended__channels",
          "Recommended channels",
          recommendedChannels
        )}
    </div>
  );
};

export default Lists;
