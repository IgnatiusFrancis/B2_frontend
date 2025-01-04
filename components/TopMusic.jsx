"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";
function TopMusic() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`${theme}-bgg p-2 md:p-4 md:flex md:gap-4 md:items-center bg-white`}
      >
        <p className="font-bold text-xl">1</p>
        <div className="md:w-[50px] md:h-[50px]">
          <Image
            src={"/albumcover.jpeg"}
            width={1000}
            height={1000}
            alt="music"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className={`font-bold text-[12px] md:text-base ${theme}-text`}>
            Crank It
          </h1>
          <p className={`text-[11px] ${theme}-text`}>
            Kanye West ft Post Malone
          </p>
        </div>
      </div>
    </>
  );
}

export default TopMusic;
