"use client";

import "./style/style.css";
import React from "react";
import Search from "./search/index";
import Account from "./account/index";
import Logo from "./logo/index";

function NavBar() {
  return (
    <div className="nav_bar">
      <div className="nav_container">
        <Logo />
      </div>
      <div className="nav_container">
        <Search />
      </div>
      <div className="nav_container">
        <Account />
      </div>
    </div>
  );
}

export default NavBar;
