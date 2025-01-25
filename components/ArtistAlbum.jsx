"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaDownload, FaPlay, FaPause } from "react-icons/fa";
import pld from "@/public/pld.jpeg";

// Waveform Component
const Waveform = ({ isPlaying }) => {
  const bars = 400;

  return (
    <div className="flex items-center gap-[2px] h-4 mx-2">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-[2px] bg-blue-500 rounded-full transition-all duration-150 ${
            isPlaying ? "animate-waveform" : "h-1"
          }`}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
};

function ArtistAlbum({
  id,
  title,
  url,
  subTitle,
  audioUrl,
  publicId,
  artist,
  currentTrackId,
  expandedId,
  handlePlayPause,
}) {
  return (
    <div className="flex flex-col gap-4 w-full mb-5  rounded-lg p-4 shadow-md hover:scale-100 hover:shadow-xl transition-all duration-500 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20">
          <Image
            src={url || "/placeholder.jpg"}
            width={1000}
            height={1000}
            alt="artist"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-lg truncate">{title}</h1>
          <p className="text-sm text-gray-600 truncate">{artist.name}</p>
          <p className="text-xs text-gray-500 truncate">{subTitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={() => handlePlayPause(id, audioUrl)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
          >
            {currentTrackId === id ? <FaPause /> : <FaPlay />}
          </button>

          {/* Download Button */}
          <a
            download
            href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${publicId}&id=${id}`}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
          >
            <FaDownload />
          </a>
        </div>
      </div>

      {/* Display Now Playing */}
      {expandedId === id && (
        <div className="mt-4">
          <Waveform isPlaying={currentTrackId === id} />
          <p className="text-xs text-gray-500">Now Playing: {title}</p>
        </div>
      )}
    </div>
  );
}

export default ArtistAlbum;
