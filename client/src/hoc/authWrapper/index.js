"use client";

import { fetchData } from "../../api/utils/fetch";
import { useTokenStore } from "@/store/tokenStore";
import { useEffect, useState } from "react";
// import

export default function withAuth(Component) {
  return () => {
    const [isLoading, setIsLoading] = useState(true);

    const { token } = useTokenStore();

    useEffect(() => {
      const verifyRefreshToken = async () => {
        try {
          const response = await fetchData("/refresh", "get");
          console.log(
            "🚀 ~ file: index.js:18 ~ verifyRefreshToken ~ response:",
            response.accessToken
          );
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


    if (!isLoading) {
      // Redirect to login or display an error message
      // router.push("/");
      return null;
    }

    // Pass the control to the component
    return <Component />;
  };
}
