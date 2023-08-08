import React from "react";
import Link from "next/link";
import { getLogout } from "../../../../api/getFetch";
import { tokenStore } from "@/store/tokenStore";

interface UserNavProps {
  removeToken: () => void;
  userId: number;
  userName: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ removeToken, userId, userName }) => {
  async function handleLogout() {
    await getLogout(userId);
    removeToken();
  }
  
  return (
    <div className="user__account__nav">
      <button onClick={handleLogout} className="logout__button">
        Log Out
      </button>
      {userName && (
        <Link href={userName} className="hidden-link">
          <button className="user_button">Your Channel</button>
        </Link>
      )}
      {userName && (
        <Link href={"/dashboard/" + userName} className="hidden-link">
          <button className="user_button">Dashboard</button>
        </Link>
      )}
    </div>
  );
};

export default UserNav;
