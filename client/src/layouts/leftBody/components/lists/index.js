"use client";

import React from "react";
import ChannelsLists from "../../../../features/channelsLists/index";

const Lists = (data) => {
  const channels = {
    followed: {
      name: "followers__channels",
      title: "Followed channels",
      channels: data.followed,
    },
    recommended: {
      name: "recommended__channels",
      title: "Recommended channels",
      channels: data.recommended,
    },
  };

  return (
    <div>
      {data.followed && (
        <ChannelsLists
          name={channels.followed.name}
          title={channels.followed.title}
          channels={channels.followed.channels}
        />
      )}
      {data.recommended && (
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
