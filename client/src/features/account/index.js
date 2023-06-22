import React, { useEffect } from "react";
import { useTokenStore } from "@/store/tokenStore";
import useFetch from "../../api/utils/useFetch";

import GuestNav from "./components/guestNav/index";
import UserNav from "./components/userNav/index";

function Account() {
  const { removeToken, setLogin, setToken, token } = useTokenStore();
  const { data, loading, error } = useFetch(setToken);

  const userStatus = useTokenStore((state) => state.isLoggedIn);
  const userToken = useTokenStore((state) => state.token);

  useEffect(() => {
    if (token) {
      setLogin();
    }
  }, [token]);

  return (
    <div className="account">
      {userStatus && !loading ? (
        <UserNav
          removeToken={removeToken}
          token={token}
          userToken={userToken}
        />
      ) : (
        <GuestNav />
      )}
    </div>
  );
}

export default Account;
