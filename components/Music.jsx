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

  // const SongCard = ({ audio }) => (
  //   <div className="border-b transition-transform duration-300 hover:shadow-md mb-1 w-full">
  //     <div
  //       className={`px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center ${theme}-bgg bg-white rounded-lg`}
  //     >
  //       <div className="flex w-full sm:w-auto items-center gap-3 sm:gap-4">
  //         <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
  //           <Image
  //             src={audio?.url}
  //             alt={audio?.title}
  //             width={70}
  //             height={70}
  //             className="w-full h-full object-cover rounded-full"
  //           />
  //         </div>
  //         <div className="flex-1 min-w-0">
  //           <h1
  //             className={`font-bold text-base sm:text-lg md:text-xl ${theme}-text truncate`}
  //           >
  //             <Link
  //               href={`/musics/${audio.id}`}
  //               className="text-gray-700 hover:text-blue-400 transition-colors"
  //             >
  //               {audio.artist.name}
  //             </Link>
  //           </h1>
  //           <h2
  //             className={`font-bold text-base sm:text-lg md:text-xl ${theme}-text truncate`}
  //           >
  //             <Link
  //               href={`/musics/${audio.id}`}
  //               className="text-gray-700 hover:text-blue-400 transition-colors"
  //             >
  //               {audio.title}
  //             </Link>
  //           </h2>
  //           <p className="text-xs text-gray-500 overflow-hidden line-clamp-2">
  //             {audio?.description}
  //           </p>
  //         </div>
  //       </div>

  //       <div className="mt-3 sm:mt-0 self-end sm:self-auto">
  //         <GradientPlayButton audioId={audio?.id} />
  //       </div>
  //     </div>
  //   </div>
  // );

  const SongCard = ({ audio }) => (
    <div className="group mb-4 w-full overflow-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          {/* Album Art & Play Button Overlay */}
          <div className="relative w-full sm:w-24 h-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0 rounded-xl overflow-hidden">
            <Image
              src={audio?.url}
              alt={audio?.title}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <GradientPlayButton audioId={audio?.id} size="md" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100 truncate">
                  <Link
                    href={`/musics/${audio.id}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {audio.title}
                  </Link>
                </h2>
                <h3 className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                  <Link
                    href={`/artists/${audio.artist.id}`}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {audio.artist.name}
                  </Link>
                </h3>
              </div>

              <div className="hidden sm:flex items-center gap-2 pt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                  {audio.genre || "Music"}
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {audio?.description}
            </p>

            <div className="mt-3 flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
              {/* <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                {audio.plays || "0"} plays
              </span> */}
              {/* <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {audio.likes || "0"}
              </span> */}
              <span className="sm:hidden inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                {audio.genre || "Music"}
              </span>
            </div>
          </div>
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
