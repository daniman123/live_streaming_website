"use client"

/**
 * @fileoverview Lists component for displaying followed and recommended channels.
 * @module Lists
 */

import React, { FC } from "react";
import ChannelsList from "../channelsList/index";
import { useTokenStore, TokenStoreState } from "../../store/tokenStore";
import { postFollowing } from "../../api/postFetch";
import { getRecommended } from "../../api/getFetch";
import useFetch from "../../api/utils/useFetch";

interface ListsProps {}

/**
 * Lists component.
 * @returns {JSX.Element} The rendered component.
 */
const Lists: FC<ListsProps> = () => {
  const userToken = useTokenStore((state: TokenStoreState) => state.token);

  /**
   * Fetches followed channels.
   */
  const { data: followedChannels, loading } = useFetch<Array<any>>(
    postFollowing,
    userToken?.name,
    userToken?.accessToken
  );

  /**
   * Fetches recommended channels.
   */
  const { data: recommendedChannels } = useFetch<Array<any>>(
    getRecommended,
    10
  );

  /**
   * Renders the ChannelsList component.
   * @param {string} name - The name of the ChannelsList component.
   * @param {string} title - The title of the ChannelsList component.
   * @param {Array} channels - The channels to be displayed.
   * @returns {JSX.Element} The rendered ChannelsList component.
   */
  const renderChannelsList = (
    name: string,
    title: string,
    channels: Array<any>
  ): JSX.Element => {
    return <ChannelsList title={title} channels={channels} />;
  };

  return (
    <div>
      {!loading &&
        followedChannels &&
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
