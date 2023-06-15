import React from "react";

import withPopup from "@/hoc/popup/withPopup";
import RegistrationForm from "@/hoc/forms/registrationForm/index";
import LoginForm from "@/hoc/forms/loginForm/index";

const EnhancedRegistrationFormPopup = withPopup(RegistrationForm, "Sign up");
const EnhancedLoginFormPopup = withPopup(LoginForm, "Log in");

function Account() {
  return (
    <div className="account">
      <EnhancedRegistrationFormPopup />
      <EnhancedLoginFormPopup />
      <button className="user_button">user</button>
    </div>
  );
}

export default Account;
