"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";

function TopMusic({ topArtists, index }) {
  
  const { theme } = useContext(ThemeContext);
  const { name, url, track, id } = topArtists || {};



  return (
    <div
      className={`${theme}-bgg p-4 md:p-2 md:flex md:gap-6 md:items-center bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
    >
      {/* Display dynamic index */}
      <p className="font-bold text-2xl text-gray-800">{index + 1}</p>

      {/* Clickable image */}
      <a href={`#Trending-Songs`} className="md:w-[60px] md:h-[60px]"> 
        <Image
          src={url || "/albumcover.jpeg"}
          width={1000}
          height={1000}
          alt={name}
          className="w-full h-full object-cover rounded-lg transition duration-300 transform hover:scale-105"
        />
      </a>

      <div>
        {/* Clickable artist name */}
        <a
          // href={`#Trending-Songs`}
          href={`/artists/${id}`}
          className={`font-bold text-[16px] md:text-lg text-gray-900 ${theme}-text hover:text-blue-500 transition-colors duration-300`}
        >
          {name}
        </a>

        <div className={`text-[14px] md:text-sm text-gray-600 ${theme}-text`}>
          {track.map((trackItem, index) => (
            <p key={trackItem?.id}>
              {trackItem?.title}
              {index < track?.length - 1 && ", "}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopMusic;
