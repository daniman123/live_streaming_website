"use client";

import React, { useEffect, useState } from "react";
import ChannelsLists from "../../../../features/channelsLists/index";
import { useTokenStore } from "@/store/tokenStore";
import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";
import useFetch from "../../../../api/utils/useFetch";

const Lists = () => {
  const { token, username } = useTokenStore((state) => state);

  const { data: followedChannels } = useFetch(postFollowing, username, token);
  const { data: recommendedChannels } = useFetch(getRecommended, 14);

  const renderChannelsLists = (name, title, channels) => {
    return <ChannelsLists name={name} title={title} channels={channels} />;
  };

  return (
    <div>
      {followedChannels &&
        renderChannelsLists(
          "followers__channels",
          "Followed channels",
          followedChannels
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
