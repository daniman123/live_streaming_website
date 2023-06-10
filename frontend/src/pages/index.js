"use client";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegisterUser from "./registerUser/index";
import HomePage from "./homePage/index";
import NotFound from "./notFound/index";

function Main() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={RegisterUser} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Main;
