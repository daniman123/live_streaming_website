import React from "react";

import SignupButton from "./components/signupButton/index";

function Account() {
  return (
    <div className="account">
      <SignupButton />
      <button className="log_in_button">log in</button>
      <button className="user_button">user</button>
    </div>
  );
}

export default Account;
