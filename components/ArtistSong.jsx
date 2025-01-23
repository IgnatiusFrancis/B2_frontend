"use client";
import Image from "next/image";
import { FaDownload, FaPlay, FaPause } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import { useState } from "react";

function ArtistSong({
  id,
  title,
  url,
  artist,
  createdAt,
  audioUrl,
  duration,
  publicId,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const baseUrl =
    process.env.B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

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
    <div className="transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105">
      <div className="flex md:flex-row flex-col gap-4 md:items-center border-b border-gray-100 p-3">
        {/* Artist Image */}
        <div className="bg-gray-50 md:block hidden p-3 rounded-full transition-transform duration-300 hover:scale-110">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={url || pld}
              width={1000}
              height={1000}
              alt="alb"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex gap-4 flex-1 items-center justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-md font-semibold">{title}</h2>
            <h3 className="text-gray-600">{artist?.name}</h3>
          </div>

          <div className="text-sm text-gray-500">{duration || "00:00"}</div>
        </div>

        {/* Play/Pause & Download Controls */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handlePlayPause}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all transform hover:scale-110"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <a
            download={audioUrl}
            href={`${baseUrl}/track/download?type=audio&key=${publicId}&id=${id}`}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all transform hover:scale-110"
          >
            <FaDownload />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArtistSong;
