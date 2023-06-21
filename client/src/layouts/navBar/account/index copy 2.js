import { useTokenStore } from "@/store/tokenStore";

function Account() {
  const userStatus = useTokenStore((state) => state.isLoggedIn);
  const { setLogin, removeToken } = useTokenStore();

  return (
    <div className="account">
      <button onClick={setLogin}>SET</button>
      <button onClick={removeToken}>REMOVE</button>
      {userStatus ? <>TRUE{userStatus}</> : <>False{userStatus}</>}
    </div>
  );
}

export default Account;
