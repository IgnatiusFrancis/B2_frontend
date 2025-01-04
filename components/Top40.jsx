"use client";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";

import { LuCircleDot } from "react-icons/lu";

function Top40() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`${theme}-bgg p-4 md:flex md:justify-between md:items-center bg-white`}
      >
        <div className="md:flex md:items-center md:gap-4">
          <div className="w-[100px] h-[100px]">
            <Image
              src={"/ol.jpeg"}
              width={1000}
              height={1000}
              alt="ol"
              className="w-full h-full object-cover "
            />
          </div>
          <div>
            <h1 className={` ${theme}-text font-bold text-[12px] md:text-2xl`}>
              Don’t Wanna Know
            </h1>
            <p className={`${theme}-text text-[12px] md:text-sm`}>
              Marroon 5ft Kendrick Lamar
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 p-4">
          <p className={`${theme}-text`}>Top 40</p>
          <p className={`${theme}-text`}>10/4/16</p>
        </div>
        <div className="flex gap-2 items-center py-2 md:py-0">
          <LuCircleDot className={`${theme}-text`} />
          <p className={`${theme}-text text-[12px] md:text-sm md:hidden`}>
            Download
          </p>
        </div>
      </div>
    </>
  );
}

export default Top40;
