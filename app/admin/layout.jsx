"use client";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Layout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track the loading state to prevent flashes

  // useEffect(() => {
  //   const token = localStorage.getItem("b2exclusiveadmin");
  //   const expirationTime = localStorage.getItem("tokenExpiration");
  //
  //   if (!token || !expirationTime || Date.now() > Number(expirationTime)) {
  //     // Token not found or expired, redirect to login
  //     localStorage.removeItem("b2exclusiveadmin");
  //     localStorage.removeItem("tokenExpiration");
  //     router.push("/");
  //   } else {
  //     // Token is valid, authenticate user
  //     setIsAuthenticated(true);
  //   }
  //
  //   // Stop the loading state regardless of authentication
  //   setLoading(false);
  // }, [router]);
  //
  // if (loading) {
  //   // Show a loading spinner or a blank page to avoid flashing content
  //   return <div>Loading...</div>;
  // }
  //
  // if (!isAuthenticated) {
  //   // While redirecting or if not authenticated, don't show any content
  //   return null;
  // }

  return (
    <div className="md:flex h-full relative w-full mx-auto">
      <SideBar />
      {children}
    </div>
  );
}

export default Layout;
