import React from "react";
import { TwitchEmbed } from "react-twitch-embed";

const TwitchStream = ({ channel }) => {
  return (
    <div>
      <TwitchEmbed channel={channel} width="100%" theme="dark" />
    </div>
  );
};

export default TwitchStream;
