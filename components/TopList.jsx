"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

// Waveform Component
const Waveform = ({ isPlaying }) => {
  const bars = 50;

  return (
    <div className="flex items-center justify-center gap-[2px] h-4 mx-2">
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

const TopList = ({ topArtists }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const { theme } = useContext(ThemeContext);
  const audioRef = useRef(null);
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePlayPause = (track) => {
    if (!track?.audioUrl) return;

    const audioUrl = track.audioUrl.replace("http://", "https://");

    if (audioRef.current) {
      if (currentTrackId === track.id) {
        // Same track - toggle play/pause
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        // Different track - switch to new track
        audioRef.current.pause();
        audioRef.current = new Audio(audioUrl);
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
          setCurrentTrackId(null);
        });
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrackId(track.id);
      }
    } else {
      // First time playing - create new audio
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTrackId(null);
      });
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrackId(track.id);
    }
  };

  const SongCard = ({ artist }) => (
    <div className="border-b transition-transform duration-300 hover:shadow-md mb-1">
      {/* Main Artist Row */}
      <div
        className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Artist Image */}
          <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={artist?.url}
              alt={artist?.name}
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Artist Info */}
          <div>
            <h1 className={`font-bold text-xl ${theme}-text`}>
              {artist?.name}
            </h1>
            <p
              className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-normal max-h-[3rem]"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {artist?.bio}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleExpand(artist?.id)}
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
          {artist?.track && artist?.track?.length > 0 ? (
            <div className="max-h-60 overflow-y-auto scrollbar-thin">
              {artist?.track.map((track) => (
                <div
                  key={track.id}
                  className="py-2 flex justify-between items-center gap-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Play/Pause Button */}
                    <button
                      onClick={() => handlePlayPause(track)}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
                    >
                      {isPlaying && currentTrackId === track.id ? (
                        <FaPause className="w-3 h-3" />
                      ) : (
                        <FaPlay className="w-3 h-3" />
                      )}
                    </button>
                    <span>{track?.title}</span>
                    {/* Waveform visualization */}
                    {currentTrackId === track.id && (
                      <Waveform isPlaying={isPlaying} />
                    )}
                  </div>

                  {/* Download Button */}
                  <a
                    href={`${baseUrl}/track/download?type=audio&key=${track?.key}&id=${track?.id}`}
                    download
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
                  >
                    <FaDownload className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tracks available</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4 grid grid-cols-1 md:flex md:flex-col gap-4">
      {topArtists?.map((artist) => (
        <SongCard key={artist?.id} artist={artist} />
      ))}
    </div>
  );
};

export default TopList;
