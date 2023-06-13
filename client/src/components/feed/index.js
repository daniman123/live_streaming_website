"use client";

import React from "react";
import MainFeed from "../../pages/homePage/index";
import UserFeed from "../../pages/user/index";
import "./style/style.css";

function Feed({ router }) {
  console.log("🚀 ~ file: index.js:9 ~ Feed ~ router:", router.query);

  return <UserFeed />;
}

export default Feed;
