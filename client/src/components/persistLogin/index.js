import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../../api/utils/fetch";
import { useTokenStore } from "@/store/tokenStore";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useTokenStore();

  const refresh = fetchData("/refresh", "get");

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(
          "🚀 ~ file: index.js:15 ~ verifyRefreshToken ~ error:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(
      "🚀 ~ file: index.js:31 ~ PersistLogin ~ isLoading:",
      isLoading
    );
    console.log("🚀 ~ file: index.js:31 ~ PersistLogin ~ token:", token);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading ....</p> : <Outlet />}</>;
};

export default PersistLogin;
