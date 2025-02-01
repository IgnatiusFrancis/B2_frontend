"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";
import Link from "next/link";

function TopMusic({ topArtists, index }) {
  const { theme } = useContext(ThemeContext);
  const { name, url, track, id, bio } = topArtists || {};

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center space-y-4">
        {/* Index Badge */}
        {/* <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xl w-12 h-12 rounded-full flex justify-center items-center shadow-lg">
          {index + 1}
        </div> */}

        {/* Main Image - Centered and Larger */}
        <div className="w-48 h-48 relative mx-auto mb-4">
          <img
            src={url || "/albumcover.jpeg"}
            alt={name}
            className="rounded-xl object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Artist Name - Centered */}
        <a
          href={`/artists/${id}`}
          className={`text-xl font-bold text-center ${theme}-text hover:text-blue-500 transition-colors duration-300 no-underline`}
        >
          {name}
        </a>

        {/* Bio - Limited to 2 lines */}
        <p
          className={`text-sm text-gray-600 ${theme}-text text-center line-clamp-2 mb-2`}
        >
          {bio}
        </p>

        {/* Tracks List */}
        <div className={`text-sm text-gray-600 ${theme}-text text-center`}>
          <h3 className="font-semibold mb-1">Featured Track:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {track?.[0] && (
              <span key={track[0]?.id} className="inline-block">
                {track[0]?.title}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopMusic;
