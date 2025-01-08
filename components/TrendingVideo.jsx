"use client";
import Image from "next/image";
import pld from "@/public/pld.jpeg";
function TrendingVideos({ id, title, date, url, artist }) {
  const imageUrl = url ? url : pld; 

  return (
    <>
      <div
        className={` flex gap-3 md:gap-4  items-center bg-white hover:text-primarycolor transition `}
      >
        <div className="w-[100px]  h-[100px]">
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            alt="all"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start">
          <p className={` font-bold text-[14px] md:text-xl`}>
            {title?.split(" ").slice(0, 3).join(" ") || "Test Title"}
          </p>
          <p className={` text-[14px] text-gray-500`}>
            {date?.split("T")[0] || "test date"}
          </p>
        </div>
      </div>
    </>
  );
}

export default TrendingVideos;
