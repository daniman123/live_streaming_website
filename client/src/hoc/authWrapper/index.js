"use client";

import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store/tokenStore";

export default function withAuth(Component) {
  return () => {
    const { token } = useTokenStore();
    const router = useRouter();

    const isAuthenticated = token; // Your authentication logic

    if (!isAuthenticated) {
      // Redirect to login or display an error message
      router.push("/");
      return null;
    }

    // Pass the control to the component
    return <Component />;
  };
}
