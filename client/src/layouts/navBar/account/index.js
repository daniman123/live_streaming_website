import React, { useEffect, useState } from "react";
import { useTokenStore } from "@/store/tokenStore";
import Link from "next/link";
import { fetchData } from "../../../api/utils/fetch";
import useFetch from "../../../api/utils/useFetch";

import withPopup from "@/hoc/popup/withPopup";
import RegistrationForm from "@/hoc/forms/registrationForm/index";
import LoginForm from "@/hoc/forms/loginForm/index";
import { getLogout } from "@/api/getFetch";

const EnhancedRegistrationFormPopup = withPopup(RegistrationForm, "Sign up");
const EnhancedLoginFormPopup = withPopup(LoginForm, "Log in");

function Account() {
  const { token, removeToken, username, setUsername } = useTokenStore();
  const { data, error, loading } = useFetch(fetchData, "/refresh", "get");

  async function handleLogout() {
    await getLogout(token);
    removeToken();
    window.location.reload();
  }

  return (
    <div className="account">
      {data?.name ? (
        <>
          <button onClick={handleLogout} className="logout__button">
            Log Out
          </button>
          {data.name && (
            <Link href={data.name} className="hidden-link">
              <button className="user_button">Your Channel</button>
            </Link>
          )}
          {data.name && (
            <Link href={"/dashboard/" + data.name} className="hidden-link">
              <button className="user_button">Dashboard</button>
            </Link>
          )}
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
