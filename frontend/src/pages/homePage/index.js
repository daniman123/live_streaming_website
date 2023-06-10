"use client";

import React from "react";
import { BrowserRouter as Route } from "react-router-dom";
import RegisterUser from "../registerUser";

export default function Main() {
  return (
    <Route>
      <RegisterUser />
    </Route>
  );
}
