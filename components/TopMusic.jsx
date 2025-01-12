"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

function TopMusic({ topArtists, index }) {
  const { theme } = useContext(ThemeContext);
  const { name, url, track, id } = topArtists || {};

  return (
    <div
      className={`${theme}-bgg p-4 md:p-2 flex items-center gap-4 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {/* Index with animation */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-2xl md:text-3xl w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center shadow-lg transition-transform duration-300 hover:scale-110">
        {index + 1}
      </div>

      {/* Clickable image */}
      <Link href="#Trending-Songs" passHref>
        <div className="w-16 h-16 md:w-20 md:h-20 cursor-pointer">
          <Image
            src={url || "/albumcover.jpeg"}
            width={1000}
            height={1000}
            alt={name}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Artist Details */}
      <div className="flex-1">
        {/* Artist Name */}
        <Link
          href={`/artists/${id}`}
          className={`font-bold text-[16px] md:text-lg text-gray-900 ${theme}-text hover:text-blue-500 transition-colors duration-300`}
        >
          {name}
        </Link>
        {/* Tracks */}
        <div className={`text-[14px] md:text-sm text-gray-600 ${theme}-text`}>
          {track.map((trackItem, idx) => (
            <p key={trackItem?.id}>
              {trackItem?.title}
              {idx < track?.length - 1 && ", "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopMusic;
