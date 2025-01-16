"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Link from "next/link";
import CreatePostLinks from "@/components/CreatePostLinks";
import ToastNotificationContainer from "@/components/ToastNotificationComponent";
function Layout({ children }) {
  const { showSideBar } = useContext(ThemeContext);
  return (
    <>
      <div className={`w-full md:w-10/12 p-2 flex flex-col gap-2`}>
        <h1 className={` text-xl`}>Movie Section</h1>

        <div
          className={`${
            showSideBar ? "w-10/12" : "w-full"
          } grid grid-cols-3 border-b border-gray-200 `}
        >
          <CreatePostLinks title={"Create Movie"} href={"/admin/movie"} />
          <CreatePostLinks
            title={"Create Season"}
            href={"/admin/movie/addseason"}
          />
          <CreatePostLinks
            title={"Create Episode"}
            href={"/admin/movie/addepisode"}
          />
        </div>

        <div className={`w-full p-4`}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
