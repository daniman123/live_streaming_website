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
  const { removeToken, setLogin, setToken, token } = useTokenStore();
  
  useEffect(() => {
    async function getData() {
      await setToken();
    }
    getData();
  }, []);

  const userStatus = useTokenStore((state) => state.isLoggedIn);
  const userToken = useTokenStore((state) => state.token);

  useEffect(() => {
    if (token) {
      setLogin();
    }
  }, [token]);

  console.log("🚀 ~ file: index.js:28 ~ Account ~ userToken:", userToken);

  async function handleLogout() {
    await getLogout(token);
    removeToken();
  }

  return (
    <div className="account">
      {userStatus ? (
        <>
          <button onClick={handleLogout} className="logout__button">
            Log Out
          </button>
          {userToken?.name && (
            <Link href={userToken?.name} className="hidden-link">
              <button className="user_button">Your Channel</button>
            </Link>
          )}
          {userToken?.name && (
            <Link
              href={"/dashboard/" + userToken?.name}
              className="hidden-link"
            >
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
