import React from "react";
import { TwitchEmbed } from "react-twitch-embed";

const TwitchStream = ({ channel }) => {
  return (
    <div>
      <TwitchEmbed
        channel={channel}
        width="100%"
        height="500px"
        theme="dark"
        // muted
        // withChat
      />
    </div>
  );
};

export default TwitchStream;
