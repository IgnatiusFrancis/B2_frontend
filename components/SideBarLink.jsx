"use client";
import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { usePathname } from "next/navigation";

function SidebarLink({ href, title, bar, icon }) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`flex ${bar ? "p-3" : "p-2"} rounded-lg items-center gap-2 hover:bg-primarycolor ${
        pathname === href ? " text-white bg-primarycolor" : ""
      }`}
    >
      {icon}
      <p className={`${bar ? "block" : "hidden"} text-xs `}>{title}</p>
    </Link>
  );
}

export default SidebarLink;
