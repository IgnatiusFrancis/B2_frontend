"use client";
import { useContext, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  FileText,
  Users,
  PenTool,
  Settings,
  LogOut,
  Menu,
  X,
  CalendarDays,
  MoveIcon,
  Folder,
  TrendingUpIcon,
  LucideTrendingUp,
} from "lucide-react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";

const Sidebar = () => {
  const { setUser } = useContext(ThemeContext);
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const navigationItems = useMemo(
    () => [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Content", href: "/admin/contents", icon: FileText },
      { title: "Events & Artists", href: "/admin/events", icon: CalendarDays },
      {
        title: "Create Content",
        href: "/admin/createpost",
        icon: PenTool,
      },
      {
        title: "Top Artist & Top Videos",
        href: "/admin/topArtist&TopTrendingVideo",
        icon: LucideTrendingUp,
      },
      { title: "Users", href: "/admin/users", icon: Users },

      // { title: "Account", href: "/admin/account", icon: Settings },
      { title: "Movie", href: "/admin/movie", icon: MoveIcon },
      { title: "Movie Contents", href: "/admin/moviecontents", icon: Folder },
    ],
    []
  );

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/auth/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("userName");
      setUser(null);

      //window.location.href = "/";
      router.push("/");

      toast.success("Logout Successful", { position: "top-center" });
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error("Unable to logout user", { position: "top-center" });
    }
  };

  const NavigationLink = ({ item }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-700"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{item.title}</span>
      </Link>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">B2XCLUSIVE</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navigationItems.map((item) => (
          <NavigationLink key={item.href} item={item} />
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-7 py-4 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
