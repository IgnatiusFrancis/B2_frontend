"use client";

import React, { useContext } from "react";
import { FaPlay } from "react-icons/fa";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";

const Music = ({ audios }) => {
  const { theme } = useContext(ThemeContext);

  const GradientPlayButton = ({ audioId }) => (
    <Link href={`/musics/${audioId}`}>
      <button className="relative group">
        {/* Outer gradient ring with pulse */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-pulse" />

        {/* Middle gradient ring with rotation */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 animate-spin-slow" />

        {/* Inner button with gradient background */}
        <div className="relative p-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
          <FaPlay className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" />
        </div>
      </button>
    </Link>
  );

  const SongCard = ({ audio }) => (
    <div className="border-b transition-transform duration-300 hover:shadow-md mb-1 w-full">
      <div
        className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={audio?.url}
              alt={audio?.title}
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className={`font-bold text-xl ${theme}-text`}>
              <Link
                href={`/artists/${audio.id}`}
                className="text-lg md:text-xl text-gray-700 hover:text-blue-400 transition-colors"
              >
                {audio.title}
              </Link>
            </h1>
            <p
              className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-normal max-h-[3rem]"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {/* {audio?.description} */}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <GradientPlayButton audioId={audio?.id} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {audios?.map((audio) => (
        <SongCard key={audio?.id} audio={audio} />
      ))}
    </div>
  );
};

export default Music;
