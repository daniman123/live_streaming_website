import React from "react";
import Link from "next/link";
import { getLogout } from "../../../../api/getFetch";
import { tokenStore } from "@/store/tokenStore";

interface UserNavProps {
  removeToken: () => void;
  token: tokenStore | null;
  userToken: tokenStore | null;
}

const UserNav: React.FC<UserNavProps> = ({ removeToken, token, userToken }) => {
  async function handleLogout() {
    await getLogout(token);
    removeToken();
  }
  
  return (
    <div className="user__account__nav">
      <button onClick={handleLogout} className="logout__button">
        Log Out
      </button>
      {userToken?.name && (
        <Link href={userToken?.name} className="hidden-link">
          <button className="user_button">Your Channel</button>
        </Link>
      )}
      {userToken?.name && (
        <Link href={"/dashboard/" + userToken?.name} className="hidden-link">
          <button className="user_button">Dashboard</button>
        </Link>
      )}
    </div>
  );
};

export default UserNav;
