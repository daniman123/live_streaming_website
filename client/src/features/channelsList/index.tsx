import React from "react";
import Link from "next/link";

import "./style/style.css";

interface ChannelListItemProps {
  channel: string;
}

function ChannelListItem({ channel }: ChannelListItemProps) {
  return (
    <li className="channels__list__element">
      <Link href={channel} className="hidden-link">
        <div className="pfp">
          <p>PFP</p>
        </div>
        <div className="metadata">
          <p className="user__name">{channel}</p>
          <p className="category">{channel}</p>
        </div>
        <div className="viewer__count">
          <p>777777</p>
        </div>
      </Link>
    </li>
  );
}

interface ChannelsListProps {
  title: string;
  channels: string[];
}

function ChannelsList({ title, channels }: ChannelsListProps) {  
  
  return (
    <div className="left__body__element">
      <div className="channels__title__wrapper">
        <h4>{title}</h4>
      </div>
      <div className="channels__list__content__wrapper">
        <ul className="channels__list__content">
          {channels.length ? (
            channels.map((channel, index) => (
              <ChannelListItem key={index} channel={channel} />
            ))
          ) : (
            <li>
              <br></br>
              <p>
                Discover and follow new channels. They'll be shown right here.
              </p>
              <br></br>
              <Link href="/discover" className="discover__followers">
                <div>Start exploring now!</div>
              </Link>
              <br></br>
              <br></br>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ChannelsList;
