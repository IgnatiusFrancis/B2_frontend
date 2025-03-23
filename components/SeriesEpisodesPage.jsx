"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  ChevronLeft,
  Play,
  Clock,
  Calendar,
  Info,
} from "lucide-react";
import { FaFileDownload } from "react-icons/fa";

const SeriesEpisodesPage = ({ series }) => {
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  useEffect(() => {
    // Set animation timing
    setIsLoaded(true);

    // Set first episode as active by default
    if (series?.episodes?.length > 0) {
      setActiveEpisode(series.episodes[0].id);
    }
  }, [series]);

  if (!series) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-400 font-medium">Loading series...</p>
        </div>
      </div>
    );
  }

  const handleDownload = async (episodeId, key, externalDownloadLink) => {
    try {
      console.log(episodeId, key, externalDownloadLink);
      setIsDownloading(true);
      const downloadLinks = externalDownloadLink || [];
      //   useState(() => {
      //     if (downloadLinks.length === 1) {
      //       setSelectedLink(downloadLinks[0].url);
      //     }
      //   }, [downloadLinks]);
      return;
      if (selectedLink && selectedLink.length > 0) {
        window.open(selectedLink, "_blank");
      } else {
        const downloadUrl = `${baseUrl}/track/download?type=episode&key=${key}&id=${episodeId}`;

        const link = document.createElement("a");
        link.href = downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Find the currently active episode
  const currentEpisode =
    series.episodes?.find((ep) => ep.id === activeEpisode) ||
    series.episodes?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
      {/* Main Content with Sticky Side Navigation */}
      <div className="w-full lg:w-5/6 mx-auto px-4 relative">
        <div className="md:flex md:gap-8">
          {/* Left Column - Episode Selector */}
          <div className="md:w-1/3 lg:w-1/4 md:sticky md:top-8 h-full">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-8">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Episodes
              </h2>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {(series.episodes || []).map((episode, index) => (
                  <div
                    key={episode.id}
                    onClick={() => setActiveEpisode(episode.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 group
                                ${
                                  activeEpisode === episode.id
                                    ? "bg-purple-600 shadow-lg shadow-purple-600/20"
                                    : "bg-gray-700/30 hover:bg-gray-700/60"
                                }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 
                                    ${
                                      activeEpisode === episode.id
                                        ? "bg-white text-purple-600"
                                        : "bg-gray-800 text-gray-300 group-hover:bg-gray-700"
                                    }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-sm line-clamp-1 text-gray-200">
                          {episode.episodeTitle}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          <span className="text-xs text-gray-400">
                            {episode.duration || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Synopsis Card */}
            <div
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } transition-all duration-700 delay-300 hidden md:block`}
            >
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Synopsis
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {series.description ||
                  "No description available for this series."}
              </p>
            </div>
          </div>

          {/* Right Column - Current Episode Details */}
          <div className="md:w-2/3 lg:w-3/4">
            {/* Synopsis Card (Mobile Only) */}
            <div
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl mb-8 md:hidden transform ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } transition-all duration-700 delay-300`}
            >
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Synopsis
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {series.description ||
                  "No description available for this series."}
              </p>
            </div>

            {/* Current Episode Feature */}
            {currentEpisode && (
              <div
                className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transform ${
                  isLoaded
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                } transition-all duration-700 delay-500`}
              >
                <div className="relative aspect-video">
                  <Image
                    src={currentEpisode.imageUrl || "/episode-placeholder.png"}
                    alt={currentEpisode.episodeTitle}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-100">
                      {currentEpisode.episodeTitle}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2 text-gray-200">
                      About this episode
                    </h4>
                    <p className="text-gray-300">
                      {currentEpisode.description ||
                        "No description available."}
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <button
                      onClick={() =>
                        handleDownload(
                          currentEpisode?.id,
                          currentEpisode?.moviekey,
                          currentEpisode?.externalDownloadLink
                        )
                      }
                      disabled={isDownloading}
                      className={`group relative w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-3 
                                        transition-all duration-300 ${
                                          isDownloading
                                            ? "bg-purple-600/50 cursor-wait"
                                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                        }`}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      <FaFileDownload
                        className={`relative ${
                          isDownloading
                            ? "animate-bounce"
                            : "group-hover:scale-110 transition-transform duration-300"
                        }`}
                      />
                      <span className="relative font-medium">
                        {isDownloading
                          ? "Initiating Download..."
                          : "Download Movie"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* No Episodes Message */}
            {(!series.episodes || series.episodes.length === 0) && (
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                  <Info className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-400">
                  No episodes available for this series yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesEpisodesPage;
