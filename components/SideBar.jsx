// "use client";
// import Cookies from "js-cookie";

// const {
//   FaChartBar,
//   FaCalendar,
//   FaUser,
//   FaChartPie,
//   FaNotesMedical,
//   FaTools,
//   FaHamburger,
// } = require("react-icons/fa");

// import { CiLogout } from "react-icons/ci";
// import { toast } from "react-toastify";
// import { MdCancel, MdMenuOpen, MdOutlineEmojiEvents } from "react-icons/md";
// import Link from "next/link";
// import SidebarLink from "./SideBarLink";
// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// function SideBar() {
//   const [showSideBar, setShowSideBar] = useState(true);
//   const [menu, setMenu] = useState(false);

//   const pathname = useParams();
//   const router = useRouter();

//   const handleLogout = () => {
//     try {
//       if (
//         localStorage.getItem("b2xclusiveadmin") &&
//         localStorage.getItem("b2xclusiveuser") &&
//         document.cookie.includes("b2xclusiveadmin") !== null
//       ) {
//         localStorage.setItem("b2xclusiveadmin", null);
//         Cookies.remove("b2xclusiveadmin");
//         toast.success(`Admin Logout Successfull`, { position: "top-center" });
//         setTimeout(() => {
//           router.push("/");
//         }, 2000);
//       } else {
//         toast.warn(`No user data found`, { position: "top-center" });
//       }
//     } catch (error) {
//       console.log("Error signing out", error.message);
//       toast.error(`Unable to logout user`, { position: "top-center" });
//     }
//   };

//   return (
//     <>
//       <div className="w-2/12">
//         <div
//           className="md:hidden absolute right-4 z-40 top-4 "
//           onClick={() => setMenu(true)}
//         >
//           <MdMenuOpen className="text-2xl" />
//         </div>

//         {menu ? (
//           <div className=" bg-white z-50 py-8 w-full top-0 right-0 left-0 bottom-0  absolute">
//             <div className="relative">
//               <MdCancel
//                 className="absolute text-xl right-6 top-4"
//                 onClick={() => setMenu(false)}
//               />
//             </div>
//             <h1 className="font-bold text-xl p-4">B2XCLUSIVE</h1>
//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <FaChartBar />
//               <p>Dashboard</p>
//             </div>

//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin/contents");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <FaCalendar />
//               <p>Contents</p>
//             </div>
//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin/events");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <MdOutlineEmojiEvents />
//               <p>Artists & Events</p>
//             </div>

//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin/users");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <FaUser />
//               <p>Users</p>
//             </div>
//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin/createpost");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <FaNotesMedical />
//               <p>Create Post</p>
//             </div>
//             <div
//               onClick={() => {
//                 setMenu(false);
//                 router.push("/admin/account");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor ${
//                 pathname === "/overview" ? "bg-primarycolor" : ""
//               }`}
//             >
//               <FaTools />
//               <p>Account</p>
//             </div>
//             <div
//               onClick={() => {
//                 setMenu(false);
//                 handleLogout();
//                 router.push("/adminlogin");
//               }}
//               className={`flex  p-4 items-center gap-2 hover:bg-primarycolor `}
//             >
//               <CiLogout />
//               <p>Log Out</p>
//             </div>
//           </div>
//         ) : (
//           ""
//         )}
//         <div className={` h-screen relative p-4 md:block hidden     `}>
//           <div className={`flex p-2  justify-between`}>
//             <Link href={"/"} className={`font-bold `}>
//               B2XCLUSIVE
//             </Link>
//           </div>

//           <div className="py-4 flex flex-col gap-2 relative">
//             <SidebarLink
//               title={"Dasboard"}
//               href={"/admin"}
//               bar={showSideBar}
//               icon={<FaChartBar />}
//             />
//             <SidebarLink
//               title={"Content"}
//               href={"/admin/contents"}
//               bar={showSideBar}
//               icon={<FaCalendar />}
//             />
//             <SidebarLink
//               title={"Artists & Events"}
//               href={"/admin/events"}
//               bar={showSideBar}
//               icon={<MdOutlineEmojiEvents />}
//             />

//             <SidebarLink
//               title={"Users"}
//               href={"/admin/users"}
//               bar={showSideBar}
//               icon={<FaUser />}
//             />
//             <SidebarLink
//               title={"Create Post"}
//               href={"/admin/createpost"}
//               bar={showSideBar}
//               icon={<FaNotesMedical />}
//             />
//             <SidebarLink
//               title={"Account"}
//               href={"/admin/account"}
//               bar={showSideBar}
//               icon={<FaTools />}
//             />
//           </div>

//           <div
//             onClick={handleLogout}
//             className="flex p-4  cursor-pointer absolute bottom-10 items-center gap-2"
//           >
//             <CiLogout />
//             <h1 className="text-xs">Logout</h1>
//           </div>
//         </div>
//       </div>{" "}
//     </>
//   );
// }

// export default SideBar;

"use client";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
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
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = useMemo(
    () => [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Content", href: "/admin/contents", icon: FileText },
      { title: "Events & Artists", href: "/admin/events", icon: CalendarDays },
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Create Post", href: "/admin/createpost", icon: PenTool },
      { title: "Account", href: "/admin/account", icon: Settings },
      { title: "Movie", href: "/admin/movie", icon: MoveIcon },
      { title: "Movie Contents", href: "/admin/moviecontents", icon: Folder },
    ],
    []
  );

  const handleLogout = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem("b2xclusiveadmin");
      if (adminToken) {
        localStorage.removeItem("b2xclusiveadmin");
        Cookies.remove("b2xclusiveadmin");
        toast.success("Logged out successfully", { position: "top-center" });
        router.push("/");
      }
    } catch (error) {
      toast.error("Logout failed", { position: "top-center" });
      console.error("Logout error:", error);
    }
  }, [router]);

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
