"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFileDownload } from "react-icons/fa";
import Image from "next/image";

export const SingleSeasonsPage = ({ series }) => {
  const [downloadingEpisodeId, setDownloadingEpisodeId] = useState(null);
  const baseUrl = "https://b2xclusive.onrender.com/api/v1";

  const handleDownload = async (episodeId, key) => {
    try {
      setDownloadingEpisodeId(episodeId);

      // Construct the download URL with the specified format
      const downloadUrl = `${baseUrl}/track/download?type=episode&key=${key}&id=${episodeId}`;

      // Create a hidden anchor element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Trigger the download
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
        <p className="text-gray-500 font-bold text-xl">No Series Found</p>
      </div>
    );
  }

  const season = series;
  const episodes = series?.episodes || [];

  if (!season || episodes.length === 0) {
    return (
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-gray-500 font-bold">No Episodes Found</p>
      </div>
    );
  }

  const trailerPosterUrl =
    episodes[0]?.posterUrl?.url || "/default-placeholder.png";

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      {/* Trailer Poster */}
      <div className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="relative group">
          <Image
            src={trailerPosterUrl}
            alt={season.movie?.title || "Season Poster"}
            height={100}
            width={100}
            className="w-full rounded-lg shadow-lg object-cover max-h-[600px] transition-transform transform group-hover:scale-105 duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h1 className="text-white text-3xl font-bold">
              {season.movie?.title || "Season Title"}
            </h1>
          </div>
        </div>
      </div>

      {/* Synopsis Section */}
      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {season.movie?.title} - Season {season.seasonNumber || "Unknown"}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">Synopsis</h2>
          <p className="text-gray-600">
            {season.movie?.description || "No synopsis available."}
          </p>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <h2 className="my-5 font-bold text-2xl text-gray-800">Episodes:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <Link href={`/season-menu/${season.id}/${episode.id}`}>
                <div className="relative">
                  <Image
                    src={episode.posterUrl?.url || "/default-placeholder.png"}
                    alt={episode.episodeTitle || "Episode Image"}
                    height={100}
                    width={100}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white p-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-bold">
                      {episode.episodeTitle || "Untitled Episode"}
                    </h3>
                    <p className="text-sm">{episode.description}</p>
                  </div>
                </div>
              </Link>
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-400">
                  Duration: {episode.duration || "Unknown"}
                </p>
                <button
                  className={`w-full py-2 ${
                    downloadingEpisodeId === episode.id
                      ? "bg-green-400"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  } text-white font-semibold rounded-lg flex justify-center items-center gap-2 transition duration-300`}
                  onClick={() => handleDownload(episode.id, episode.key)}
                  disabled={downloadingEpisodeId === episode.id}
                >
                  <FaFileDownload />
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
