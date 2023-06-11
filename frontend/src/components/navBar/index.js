"use client";

import React from "react";
import Search from "./search/index";
import Account from "./account/index";
import Logo from "./logo/index";

function NavBar() {
  return (
    <div className="nav_bar">
      <Logo />
      <Search />
      <Account />
    </div>
  );
}

export default NavBar;
