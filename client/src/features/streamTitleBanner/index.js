'use client'

import React from "react";

function StreamTitleBanner() {
  return (
    <div className="stream__title__banner">
      <div className="metadata__banner">
        <div className="pfp__banner">
          <p>PFP</p>
        </div>
        <div className="naming_att_banner">
          <p className="user__name__banner">Username</p>
          <p className="title__banner">Stream Title</p>
          <p className="category__banner">Category</p>
        </div>
      </div>
      <div className="viewer__count__banner">
        <p>10000</p>
      </div>
    </div>
  );
}

export default StreamTitleBanner;
