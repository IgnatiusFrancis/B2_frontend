"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";
import { FaDownload, FaStopCircle } from "react-icons/fa";
function TopPlaylist() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`bg-white p-4 flex flex-col md:flex-row md:flex gap-4 md:items-center justify-between`}
      >
        <div className="md:flex md:items-center gap-4">
          <div className="w-full md:w-[50px] h-[50px]">
            <Image
              src={"/albumcover.jpeg"}
              width={1000}
              height={1000}
              alt="music"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className={`font-bold ${theme}-text`}>
              Crank It (Dynamic Edit)
            </h1>
            <p className={`text-[11px]  ${theme}-text`}>
              Kanye West ft Post Malone
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <FaDownload className={`${theme}-text`} />
          <FaStopCircle className={`${theme}-text`} />
        </div>
      </div>
    </>
  );
}

export default TopPlaylist;
