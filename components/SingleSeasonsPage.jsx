"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFileDownload } from "react-icons/fa";
import Image from "next/image";
import pld from "@/public/pld.jpeg";
import { Play } from "lucide-react";

// SingleSeasonsPage.jsx
export const SingleSeasonsPage = ({ series }) => {
  const [downloadingEpisodeId, setDownloadingEpisodeId] = useState(null);
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const handleDownload = async (episodeId, key) => {
    try {
      setDownloadingEpisodeId(episodeId);
      const downloadUrl = `${baseUrl}/track/download?type=episode&key=${key}&id=${episodeId}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingEpisodeId(null);
    }
  };

  if (!series) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-400 font-medium">No Series Found</p>
        </div>
      </div>
    );
  }

  const season = series;
  const episodes = series?.episodes || [];
  const trailerPosterUrl = episodes[0]?.imageUrl || "/placeholder.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative w-full lg:w-5/6 mx-auto pt-8 px-4">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={trailerPosterUrl}
            alt={season.movie?.title || pld}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {season.movie?.title} - Season{" "}
                {season.seasonNumber || "Unknown"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Synopsis Section */}
      <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Synopsis
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {season.movie?.description || "No synopsis available."}
          </p>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Episodes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode, index) => (
            <div
              key={episode.id}
              className="group relative bg-gray-800/50 rounded-xl overflow-hidden hover:scale-105 
                        transition-all duration-300 backdrop-blur-sm shadow-xl animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/season-menu/${season.id}/${episode.id}`}>
                <div className="aspect-video relative">
                  <Image
                    src={episode.imageUrl || "/placeholder.png"}
                    alt={episode.episodeTitle}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                                  group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <h3 className="font-bold text-lg mb-1">
                        {episode.episodeTitle || "Untitled Episode"}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">
                    Duration: {episode.duration || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(episode.id, episode.moviekey)}
                  disabled={downloadingEpisodeId === episode.id}
                  className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 
                            transition-all duration-300 ${
                              downloadingEpisodeId === episode.id
                                ? "bg-purple-600/50 cursor-wait"
                                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            }`}
                >
                  <FaFileDownload
                    className={
                      downloadingEpisodeId === episode.id
                        ? "animate-bounce"
                        : ""
                    }
                  />
                  {downloadingEpisodeId === episode.id
                    ? "Downloading..."
                    : "Download"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
