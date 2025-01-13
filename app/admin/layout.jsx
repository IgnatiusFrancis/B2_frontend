"use client";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Layout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track the loading state to prevent flashes

  return (
    <div className="md:flex h-full relative w-full mx-auto">
      <SideBar />
      {children}
    </div>
  );
}

export default Layout;
