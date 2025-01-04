"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("b2exclusiveadmin");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (!token || Date.now() > expirationTime) {
      // Token not found or expired, redirect to login
      localStorage.removeItem("b2exclusiveadmin");

      router.push("/login");
    } else {
      // Token is valid, authenticate user
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
};
