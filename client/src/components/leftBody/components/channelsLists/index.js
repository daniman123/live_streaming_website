"use client";

import React from "react";
import "./style/style.css";

function ChannelsLists({ name, title, channels }) {
  return (
    <div className="left__body__element">
      <div className={name + "__title__wrapper"}>
        <h4>{title}</h4>
      </div>
      <div className="channels__list__content__wrapper">
        <ul className="channels__list__content">
          {channels &&
            channels.map((channel, index) => (
              <li key={index} className="channels__list__element">
                <div className="pfp">
                  <p>PFP</p>
                </div>
                <div className="metadata">
                  <p className="user__name">{channel.username}</p>
                  <p className="category">{channel.category}</p>
                </div>
                <div className="viewer__count">
                  <p>{channel.viewer_count}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ChannelsLists;
