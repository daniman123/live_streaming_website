"use client";

import ChannelsList from "../../../../features/channelsList/index";
import { useTokenStore } from "@/store/tokenStore";
import { postFollowing } from "@/api/postFetch";
import { getRecommended } from "@/api/getFetch";
import useFetch from "../../../../api/utils/useFetch";

const Lists = () => {
  const { token, username } = useTokenStore((state) => state);

  const { data: followedChannels } = useFetch(postFollowing, username, token);
  const { data: recommendedChannels } = useFetch(getRecommended, 10);

  const renderChannelsList = (name, title, channels) => {
    return <ChannelsList name={name} title={title} channels={channels} />;
  };

  return (
    <div>
      {followedChannels &&
        renderChannelsList(
          "followers__channels",
          "Followed channels",
          followedChannels
        )}
      {recommendedChannels &&
        renderChannelsList(
          "recommended__channels",
          "Recommended channels",
          recommendedChannels
        )}
    </div>
  );
};

export default Lists;
