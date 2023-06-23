import React, { useEffect } from "react";
import { useTokenStore, tokenStore } from "../../store/tokenStore";
import useFetch from "../../api/utils/useFetch";

import GuestNav from "./components/guestNav/index";
import UserNav from "./components/userNav/index";

const Account: React.FC = () => {
  const { removeToken, setLogin, setToken, token } = useTokenStore();
  const { data, loading, error } = useFetch(setToken);

  const userStatus: boolean = useTokenStore((state) => state.isLoggedIn);
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
};

export default Account;
