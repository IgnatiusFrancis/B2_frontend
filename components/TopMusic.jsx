"use client";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Music2, ExternalLink } from "lucide-react";
import Link from "next/link";

const TopMusic = ({ topArtists, index }) => {
  const { theme } = useContext(ThemeContext);
  const { name, url, track, id, bio } = topArtists || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full max-w-sm bg-gradient-to-br from-white via-white/95 to-gray-50 
        dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-800 
        rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500
        overflow-hidden p-6"
    >
      {/* Background gradient effect */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 
        dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 opacity-0 group-hover:opacity-100 
        transition-opacity duration-500"
      />

      <div className="relative flex flex-col items-center space-y-6">
        {/* Rank indicator */}
        <div
          className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center 
          bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold rounded-full text-sm"
        >
          {index + 1}
        </div>

        {/* Image Container */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative w-56 h-56 rounded-2xl overflow-hidden shadow-lg group/image"
        >
          {/* Fallback image icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Music2 className="w-12 h-12 text-gray-400" />
          </div>

          {/* Main image with blur loading */}
          <img
            src={url || "/albumcover.jpeg"}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover z-10 
              transition-transform duration-700 group-hover/image:scale-110"
            loading="lazy"
          />

          {/* Hover overlay with play button */}
          <div
            className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-black/30 to-transparent 
            opacity-0 group-hover/image:opacity-100 transition-all duration-300 
            flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              animate={{ scale: 1, opacity: 1 }}
              className="transform -translate-y-4 group-hover/image:translate-y-0 transition-transform duration-300"
            >
              <PlayCircle className="w-16 h-16 text-white shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Artist Name */}

        <Link
          href={`/artists/${id}`}
          className="group/link flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-white 
    hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
        >
          {name}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Bio */}
        <p
          className="text-sm text-gray-600 dark:text-gray-300 text-center line-clamp-2 
          relative max-w-[90%] after:absolute after:bottom-0 after:right-0 after:h-full after:w-12 
          after:bg-gradient-to-l after:from-white dark:after:from-gray-900"
        >
          {bio}
        </p>

        {/* Featured Track */}
        <div className="w-full space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
            Featured Track
          </h3>
          {track?.[0] && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 
                dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-sm 
                hover:shadow-md transition-all duration-300 
                text-sm text-center text-gray-700 dark:text-gray-200"
            >
              <Music2 className="w-4 h-4 inline-block mr-2 text-blue-500" />
              {track[0]?.title}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TopMusic;
