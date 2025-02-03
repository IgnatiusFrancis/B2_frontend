"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

import CreatePostLinks from "@/components/CreatePostLinks";
function Layout({ children }) {
  const { showSideBar } = useContext(ThemeContext);
  return (
    <>
      <div className={`w-full md:w-10/12 p-2 flex flex-col gap-2`}>
        <h1 className={` text-xl`}>Top Trending</h1>

        <div
          className={`${
            showSideBar ? "w-10/12" : "w-full"
          } grid grid-cols-3 border-b border-gray-200 `}
        >
          <CreatePostLinks title={"Top Artists"} href={"/admin/topTrending"} />
          <CreatePostLinks
            title={"Top Trending Videos"}
            href={"/admin/topTrending/toptrendingvideo"}
          />
          <CreatePostLinks
            title={"Latest Musics"}
            href={"/admin/topTrending/latestMusic"}
          />
        </div>

        <div className={`w-full p-4`}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
