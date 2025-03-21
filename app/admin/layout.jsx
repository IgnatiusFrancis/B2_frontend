"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import axios from "axios";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // const response = await axios.get(`${baseUrl}/auth/user/me`, {
        //   withCredentials: true,
        // });
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get(`${baseUrl}/auth/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;

        // Check if user exists and has the admin role
        if (user && user.role === "admin") {
          setIsAuthenticated(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router, baseUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="md:flex h-full relative w-full mx-auto">
        <SideBar />
        {children}
      </div>
    );
  }

  return null;
}
