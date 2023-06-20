import React, { useEffect, useState } from "react";
import { useTokenStore } from "@/store/tokenStore";
import Link from "next/link";

import withPopup from "@/hoc/popup/withPopup";
import RegistrationForm from "@/hoc/forms/registrationForm/index";
import LoginForm from "@/hoc/forms/loginForm/index";
import { getLogout } from "@/api/getFetch";

const EnhancedRegistrationFormPopup = withPopup(RegistrationForm, "Sign up");
const EnhancedLoginFormPopup = withPopup(LoginForm, "Log in");

function Account() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { token, removeToken, username } = useTokenStore();

  useEffect(() => {
    if (token !== null) {
      setLoggedIn(true);
    }
  }, [token]);

  async function handleLogout() {
    await getLogout(token);
    setLoggedIn(false);
    await removeToken();
  }

  return (
    <div className="account">
      {loggedIn ? (
        <>
          <button onClick={handleLogout} className="logout__button">
            Log Out
          </button>
          <Link href={username} className="hidden-link">
            <button className="user_button">Your Channel</button>
          </Link>
          <Link href={"/dashboard/" + username} className="hidden-link">
            <button className="user_button">Dashboard</button>
          </Link>
        </>
      ) : (
        <div>
          <EnhancedRegistrationFormPopup />
          <EnhancedLoginFormPopup />
        </div>
      )}
    </div>
  );
}

export default Account;
