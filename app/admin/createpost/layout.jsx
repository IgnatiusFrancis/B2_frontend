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
          } grid md:grid-cols-8 grid-cols-4 md:gap-0 gap-5 border-b border-gray-200 `}
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
            title={"Advert"}
            href={"/admin/createpost/addalbum"}
          />

          <CreatePostLinks
            title={"Events"}
            href={"/admin/createpost/addevent"}
          />

          <CreatePostLinks
            title={"Hero Section"}
            href={"/admin/createpost/updatehero"}
          />
          <CreatePostLinks title={"News"} href={"/admin/createpost/addnews"} />
        </div>

        <div className={`w-full p-4`}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
