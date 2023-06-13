"use client";

import Link from 'next/link';

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
                <Link href={channel} className="hidden-link">
                  <div className="pfp">
                    <p>PFP</p>
                  </div>
                  <div className="metadata">
                    <p className="user__name">{channel}</p>
                    <p className="category">{channel}</p>
                  </div>
                  <div className="viewer__count">
                    <p>{channel}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default ChannelsLists;
