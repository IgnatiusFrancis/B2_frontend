"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlay,
  FaPause,
  FaDownload,
  FaClock,
  FaCalendar,
  FaMusic,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import TopMusic from "./TopMusic";

const Waveform = ({ isPlaying }) => {
  const bars = 200;
  return (
    <div className="flex items-center gap-[2px] h-8 mx-2">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-[2px] bg-blue-500 rounded-full transition-all duration-150 ${
            isPlaying ? "animate-waveform" : "h-2"
          }`}
          style={{
            animationDelay: `${i * 0.05}s`,
            backgroundColor: `rgba(59, 130, 246, ${0.3 + Math.random() * 0.7})`,
          }}
        />
      ))}
    </div>
  );
};

const SingleSongPageComponent = ({ audio, topArtists }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  //   const { theme } = useContext(ThemeContext);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayPause = (audio) => {
    console.log(audio);
    if (!audio?.audioUrl) return;

    const audioUrl = audio.audioUrl.replace("http://", "https://");

    if (audioRef.current) {
      if (currentTrackId === audio.id) {
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
        setCurrentTrackId(audio.id);
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
      setCurrentTrackId(audio.id);
    }
  };
  //   console.log(audio);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section - Adjusted height for mobile */}
      <div className="relative h-[30vh] md:h-[40vh] w-full overflow-hidden">
        <Image
          src={audio.url || "/placeholder.jpg"}
          alt={audio.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
      </div>

      {/* Main Content - Improved padding for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Song Details */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl">
              {/* Song Header - Restructured for mobile */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-6">
                <div className="w-full md:w-auto flex justify-center md:block">
                  <Image
                    src={audio.url || "/placeholder.jpg"}
                    alt={audio.title}
                    width={150}
                    height={150}
                    className="rounded-xl shadow-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent break-words">
                    {audio.title}
                  </h1>
                  <Link
                    href={`/artists/${audio.artist.id}`}
                    className="text-lg md:text-xl text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {audio.artist.name}
                  </Link>

                  {/* Metadata Grid - Improved spacing */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{audio.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendar className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(audio.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMusic className="text-blue-500 flex-shrink-0" />
                      <span className="truncate">{audio.subTitle}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls - Adjusted spacing */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start">
                  <button
                    onClick={() => handlePlayPause(audio)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
                  >
                    {isPlaying && currentTrackId === audio.id ? (
                      <FaPause size={25} />
                    ) : (
                      <FaPlay size={25} />
                    )}
                  </button>
                  {/* <span>{audio?.title}</span> */}

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 md:p-4 rounded-full transition-all transform hover:scale-105 ${
                      isLiked
                        ? "bg-pink-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    <FaHeart size={20} />
                  </button>
                  <button className="p-3 md:p-4 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-all transform hover:scale-105">
                    <FaShare size={20} />
                  </button>
                </div>
                {/* Waveform visualization */}
                {currentTrackId === audio.id && (
                  <Waveform isPlaying={isPlaying} />
                )}

                <div className="flex justify-center md:justify-start">
                  <a
                    download
                    href={`https://xclusive.onrender.com/api/v1/track/download?type=audio&key=${audio.publicId}&id=${audio.id}`}
                    className="inline-flex items-center px-4 md:px-6 py-2.5 md:py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <FaDownload className="mr-2" size={18} />
                    <span className="text-sm md:text-base">Download Track</span>
                  </a>
                </div>
              </div>

              {/* Description - Improved readability */}
              <div className="mt-6 md:mt-8">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-200">
                  About This Track
                </h2>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                  {audio.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Top Artists */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl sticky top-4">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Top Artists This Week
              </h2>
              <div className="space-y-3 md:space-y-4">
                {topArtists?.map((artist, index) => (
                  <TopMusic key={artist.id} topArtists={artist} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSongPageComponent;
