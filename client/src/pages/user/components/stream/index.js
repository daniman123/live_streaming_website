import React from "react";
import TwitchStream from "./streams";

const Stream = () => {
  return (
    <div>
      <h1>Live Stream</h1>
      <TwitchStream channel="HasanAbi" />
    </div>
  );
};

export default Stream;
