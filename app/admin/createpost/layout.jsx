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
        <h1 className={` text-xl`}>Create post</h1>

        <div
          className={`${
            showSideBar ? "w-10/12" : "w-full"
          } grid grid-cols-6 border-b border-gray-200 `}
        >
          <CreatePostLinks title={"Blog"} href={"/admin/createpost"} />
          <CreatePostLinks
            title={"Artists"}
            href={"/admin/createpost/addartist"}
          />

          <CreatePostLinks
            title={"Music"}
            href={"/admin/createpost/addmusic"}
          />
          <CreatePostLinks
            title={"Video"}
            href={"/admin/createpost/addvideo"}
          />
          <CreatePostLinks
            title={"Album"}
            href={"/admin/createpost/addalbum"}
          />

          <CreatePostLinks
            title={"Events"}
            href={"/admin/createpost/addevent"}
          />
        </div>

        <div className={`w-full p-4`}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
