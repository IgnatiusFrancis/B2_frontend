"use client";

import Image from "next/image";
import { useState } from "react";
import { FaDownload, FaPlay, FaPause } from "react-icons/fa";
import pld from "@/public/pld.jpeg";

function ArtistAlbum({ id, title, image, subTitle, audioUrl, createdAt, publicId, artist }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const handlePlayPause = () => {
    if (!audio) {
      const newAudio = new Audio(audioUrl.replace("http://", "https://"));
      setAudio(newAudio);

      newAudio.addEventListener("ended", () => setIsPlaying(false));
      newAudio.play();
    } else if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20">
          <Image
            src={image?.url || pld}
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
          <button
            onClick={handlePlayPause}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <a
            download={audioUrl}
            href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${publicId}&id=${id}`}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
          >
            <FaDownload />
          </a>
        </div>
      </div>
      {isPlaying && (
        <div className="mt-4">
          <p className="text-xs text-gray-500">Now Playing: {title}</p>
        </div>
      )}
    </div>
  );
}

export default ArtistAlbum;
