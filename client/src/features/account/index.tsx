import React, { useEffect } from "react";
import { useTokenStore, tokenStore } from "../../store/tokenStore";
import useFetch from "../../api/utils/useFetch";

import GuestNav from "./components/guestNav/index";
import UserNav from "./components/userNav/index";


const Account: React.FC = () => {
  const { removeToken, setLogin, setToken, token } = useTokenStore();
  const { data, loading, error } = useFetch(setToken);

  const userStatus: boolean = useTokenStore((state) => state.isLoggedIn);
  const userName = useTokenStore((state) => state.username);
  const userId = useTokenStore((state) => state.userId);

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
          userId={userId}
          userName={userName}
        />
      ) : (
        <GuestNav />
      )}
    </div>
  );
};

export default Account;
