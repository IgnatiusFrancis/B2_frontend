
"use client";

import React, { useState } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const TopList = ({ topArtists }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [audio, setAudio] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };



  const handlePlayPause = (audioUrl) => {
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

  const SongCard = ({ artist }) => (
   
    <div className="border-b transition-transform duration-300 hover:shadow-md mb-1">
      {/* Main Artist Row */}
      <div
        className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
      >
        <div className="flex items-center gap-4">
          {/* Artist Image */}
          <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={artist.url}
              alt={artist.name}
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Artist Info */}
          <div>
            <h1 className={`font-bold text-xl ${theme}-text`}>
              {artist.name}
            </h1>
            <p className="text-xs text-gray-500">{artist.bio}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleExpand(artist.id)}
            className="focus:outline-none hover:rotate-90 transition-transform duration-300"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expandedId === artist.id ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-gray-50 px-6 py-3">
          {artist.track && artist.track.length > 0 ? (
            artist.track.map((track, index) => (
              <div
                key={index}
                className="py-2 flex justify-between items-center gap-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlayPause(track.audioUrl)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
                  >
                   {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <span>{track.title}</span>
                </div>
                {/* Download Button */}
                <a
                  download={track.audioUrl}
                   href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${track.key}&id=${track.id}`}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
                >
                  <FaDownload />
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tracks available</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4 grid grid-cols-2 md:flex md:flex-col gap-4 ">
      {topArtists.map((artist) => (
        <SongCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
};

export default TopList;
