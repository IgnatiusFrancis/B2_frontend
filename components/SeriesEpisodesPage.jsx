// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Download,
//   Play,
//   Clock,
//   BookOpen,
//   ChevronRight,
//   Info,
//   X,
// } from "lucide-react";
// import { FaPlay } from "react-icons/fa";

// const EnhancedSeriesEpisodesPage = ({ series }) => {
//   const [featuredEpisode, setFeaturedEpisode] = useState(null);
//   const [downloadingEpisodes, setDownloadingEpisodes] = useState({});
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [previewModal, setPreviewModal] = useState(null);

//   useEffect(() => {
//     setIsLoaded(true);
//     // Set first episode as featured by default
//     if (series?.episodes?.length > 0) {
//       setFeaturedEpisode(series.episodes[0]);
//     }
//   }, [series]);

//   const handleDownload = async (episode) => {
//     const downloadEpisode = async () => {
//       setDownloadingEpisodes((prev) => ({ ...prev, [episode.id]: true }));

//       try {
//         // Simulate download process
//         await new Promise((resolve) => setTimeout(resolve, 1500));

//         // Actual download logic would go here
//         console.log(`Downloading episode: ${episode.episodeTitle}`);
//       } catch (error) {
//         console.error("Download failed:", error);
//       } finally {
//         setDownloadingEpisodes((prev) => {
//           const updated = { ...prev };
//           delete updated[episode.id];
//           return updated;
//         });
//       }
//     };

//     downloadEpisode();
//   };

//   const handlePreview = (episode) => {
//     setPreviewModal(episode);
//   };

//   const embedYouTubeUrl = (url) => {
//     if (!url) return "";
//     // Handle different YouTube URL formats
//     const videoIdMatch = url.match(
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
//     );
//     return videoIdMatch
//       ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
//       : "";
//   };

//   if (!series) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
//         <div className="text-center space-y-4 animate-pulse">
//           <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
//             <Play className="w-12 h-12 text-gray-400" />
//           </div>
//           <p className="text-gray-400 font-medium">Loading series...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
//       <div className="container mx-auto px-4 py-12 lg:py-16">
//         <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
//           {/* Episodes List */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//                 Episodes
//               </h2>
//               <span className="text-gray-400">
//                 {series.episodes?.length || 0} Episodes
//               </span>
//             </div>

//             <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
//               {series.episodes?.map((episode, index) => (
//                 <div
//                   key={episode.id}
//                   className="bg-gray-800/40 hover:bg-gray-800/60 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 group"
//                   onClick={() => setFeaturedEpisode(episode)}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-gray-700 text-gray-300 rounded-full w-10 h-10 flex items-center justify-center font-bold">
//                       {index + 1}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
//                         {episode.episodeTitle}
//                       </h3>
//                       <div className="flex items-center text-gray-400 text-sm space-x-2">
//                         <Clock className="w-4 h-4" />
//                         <span>{episode.duration || "N/A"}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     {/* Preview Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handlePreview(episode);
//                       }}
//                       className="rounded-full p-2 bg-gray-700/50 hover:bg-gray-600/50 transition-all"
//                     >
//                       <FaPlay className="w-4 h-4 text-gray-300 hover:text-white" />
//                     </button>

//                     {/* Download Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDownload(episode);
//                       }}
//                       className={`
//                         rounded-full p-2 transition-all duration-300
//                         ${
//                           downloadingEpisodes[episode.id]
//                             ? "bg-purple-600/50 cursor-wait"
//                             : "bg-purple-600/30 hover:bg-purple-600/50 hover:scale-105"
//                         }
//                       `}
//                     >
//                       {downloadingEpisodes[episode.id] ? (
//                         <div className="animate-spin">
//                           <Download className="w-5 h-5 text-purple-400" />
//                         </div>
//                       ) : (
//                         <Download className="w-5 h-5 text-purple-300 hover:text-white" />
//                       )}
//                     </button>
//                     <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Featured Episode Details */}
//           {featuredEpisode && (
//             <div className="bg-gray-800/40 rounded-3xl overflow-hidden shadow-2xl">
//               <div className="relative aspect-video">
//                 <Image
//                   src={featuredEpisode.imageUrl || "/episode-placeholder.png"}
//                   alt={featuredEpisode.episodeTitle}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <h2 className="text-2xl font-bold text-white">
//                     {featuredEpisode.episodeTitle}
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 flex items-center">
//                     <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
//                     Episode Description
//                   </h3>
//                   <p className="text-gray-300">
//                     {featuredEpisode.description || "No description available."}
//                   </p>
//                 </div>

//                 <div className="flex space-x-4">
//                   {/* Preview Button */}
//                   <button
//                     onClick={() => handlePreview(featuredEpisode)}
//                     className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
//                       bg-gray-800/50 hover:bg-gray-700/50
//                       transition-all duration-300 group"
//                   >
//                     <FaPlay className="w-5 h-5 text-purple-400 group-hover:text-white" />
//                     <span>Preview</span>
//                   </button>

//                   {/* Download Button */}
//                   <button
//                     onClick={() => handleDownload(featuredEpisode)}
//                     className={`
//                       flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
//                       bg-gradient-to-r from-purple-600 to-pink-600
//                       hover:from-purple-700 hover:to-pink-700
//                       transition-all duration-300 group
//                       ${
//                         downloadingEpisodes[featuredEpisode.id]
//                           ? "cursor-wait"
//                           : ""
//                       }
//                     `}
//                   >
//                     {downloadingEpisodes[featuredEpisode.id] ? (
//                       <div className="animate-spin">
//                         <Download className="w-5 h-5 text-white/50" />
//                       </div>
//                     ) : (
//                       <>
//                         <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                         <span>Download Episode</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Series Synopsis */}
//         {series.description && (
//           <div className="mt-12 bg-gray-800/40 rounded-2xl p-6">
//             <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//               Series Synopsis
//             </h3>
//             <p className="text-gray-300 leading-relaxed">
//               {series.description}
//             </p>
//           </div>
//         )}

//         {/* Preview Modal */}
//         {previewModal && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
//             onClick={() => setPreviewModal(null)}
//           >
//             <div
//               className="bg-gray-800 rounded-2xl max-w-3xl w-full mx-4"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="relative aspect-video rounded-t-2xl overflow-hidden">
//                 {previewModal.trailerUrl ? (
//                   <iframe
//                     src={embedYouTubeUrl(previewModal.trailerUrl)}
//                     title={previewModal.episodeTitle}
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                     className="absolute inset-0 w-full h-full"
//                   />
//                 ) : (
//                   <Image
//                     src={previewModal.imageUrl || "/episode-placeholder.png"}
//                     alt={previewModal.episodeTitle}
//                     fill
//                     className="object-cover"
//                   />
//                 )}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//                 <button
//                   className="absolute top-4 right-4 bg-gray-900/50 rounded-full p-2 hover:bg-gray-900/70 transition-all"
//                   onClick={() => setPreviewModal(null)}
//                 >
//                   <X className="w-6 h-6 text-white" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4 text-white">
//                   {previewModal.episodeTitle}
//                 </h2>
//                 <p className="text-gray-300">
//                   {previewModal.description || "No description available."}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EnhancedSeriesEpisodesPage;

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Download,
  Play,
  Clock,
  BookOpen,
  ChevronRight,
  Info,
  X,
} from "lucide-react";
import { FaPlay } from "react-icons/fa";

const RecommendedSeriesCard = ({ series, onSeriesSelect }) => {
  return (
    <div
      onClick={() => onSeriesSelect(series)}
      className="flex-shrink-0 w-48 mr-4 cursor-pointer group"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={series.coverImageUrl || "/placeholder-series.png"}
          alt={series.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-white font-semibold text-sm truncate">
            {series.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

const EnhancedSeriesEpisodesPage = ({ series, recommendedSeries = [] }) => {
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [downloadingEpisodes, setDownloadingEpisodes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);
  const [currentSeries, setCurrentSeries] = useState(series);

  useEffect(() => {
    setIsLoaded(true);
    // Set first episode as featured by default
    if (currentSeries?.episodes?.length > 0) {
      setFeaturedEpisode({
        ...currentSeries.episodes[0],
        trailerUrl: currentSeries.trailerUrl,
      });
    }
  }, [currentSeries]);

  const handleDownload = async (episode) => {
    const downloadEpisode = async () => {
      setDownloadingEpisodes((prev) => ({ ...prev, [episode.id]: true }));

      try {
        // Simulate download process
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Actual download logic would go here
        console.log(`Downloading episode: ${episode.episodeTitle}`);
      } catch (error) {
        console.error("Download failed:", error);
      } finally {
        setDownloadingEpisodes((prev) => {
          const updated = { ...prev };
          delete updated[episode.id];
          return updated;
        });
      }
    };

    downloadEpisode();
  };

  const handlePreview = (episode, trailerUrl) => {
    setPreviewModal({ ...episode, trailerUrl });
  };

  const handleSeriesSelect = (newSeries) => {
    // Reset state when a new series is selected
    setCurrentSeries(newSeries);
    console.log("newSeries:", newSeries);
    setFeaturedEpisode({
      ...newSeries.episodes[0],
      trailerUrl: newSeries.trailerUrl,
    });
    setPreviewModal(null);
  };

  const embedYouTubeUrl = (url) => {
    if (!url) return "";
    // Handle different YouTube URL formats
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
      : "";
  };

  if (!currentSeries) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-400 font-medium">Loading series...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Existing code for episodes and featured episode */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
          {/* Episodes List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Episodes
              </h2>
              <span className="text-gray-400">
                {series.episodes?.length || 0} Episodes
              </span>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
              {series.episodes?.map((episode, index) => (
                <div
                  key={episode.id}
                  className="bg-gray-800/40 hover:bg-gray-800/60 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 group"
                  onClick={() =>
                    setFeaturedEpisode({
                      ...episode,
                      trailerUrl: series.trailerUrl,
                    })
                  }
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-700 text-gray-300 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {episode.episodeTitle}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(episode, series.trailerUrl);
                      }}
                      className="rounded-full p-2 bg-gray-700/50 hover:bg-gray-600/50 transition-all"
                    >
                      <FaPlay className="w-4 h-4 text-gray-300 hover:text-white" />
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(episode);
                      }}
                      className={`
                        rounded-full p-2 transition-all duration-300
                        ${
                          downloadingEpisodes[episode.id]
                            ? "bg-purple-600/50 cursor-wait"
                            : "bg-purple-600/30 hover:bg-purple-600/50 hover:scale-105"
                        }
                      `}
                    >
                      {downloadingEpisodes[episode.id] ? (
                        <div className="animate-spin">
                          <Download className="w-5 h-5 text-purple-400" />
                        </div>
                      ) : (
                        <Download className="w-5 h-5 text-purple-300 hover:text-white" />
                      )}
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Episode Details */}
          {featuredEpisode && (
            <div className="bg-gray-800/40 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <Image
                  src={featuredEpisode.imageUrl || "/episode-placeholder.png"}
                  alt={featuredEpisode.episodeTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {featuredEpisode.episodeTitle}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center text-gray-300">
                    <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
                    Episode Description
                  </h3>
                  <p className="text-gray-300">
                    {featuredEpisode.description || "No description available."}
                  </p>
                </div>

                <div className="flex space-x-4">
                  {/* Preview Button */}
                  <button
                    onClick={() =>
                      handlePreview(featuredEpisode, featuredEpisode.trailerUrl)
                    }
                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl 
                      bg-gray-800/50 hover:bg-gray-700/50 
                      transition-all duration-300 group"
                  >
                    <FaPlay className="w-5 h-5 text-purple-400 group-hover:text-white" />
                    <span>Preview</span>
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(featuredEpisode)}
                    className={`
                      flex items-center justify-center space-x-2 px-6 py-3 rounded-xl 
                      bg-gradient-to-r from-purple-600 to-pink-600
                      hover:from-purple-700 hover:to-pink-700
                      transition-all duration-300 group
                      ${
                        downloadingEpisodes[featuredEpisode.id]
                          ? "cursor-wait"
                          : ""
                      }
                    `}
                  >
                    {downloadingEpisodes[featuredEpisode.id] ? (
                      <div className="animate-spin">
                        <Download className="w-5 h-5 text-white/50" />
                      </div>
                    ) : (
                      <>
                        <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Download Episode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Series Synopsis */}
        {currentSeries.description && (
          <div className="mt-12 bg-gray-800/40 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Series Synopsis
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {currentSeries.description}
            </p>
          </div>
        )}

        {/* Recommended Series Section */}
        {recommendedSeries.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              You Might Also Like
            </h3>
            <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
              {recommendedSeries.map((recommendedSeries) => (
                <RecommendedSeriesCard
                  key={recommendedSeries.id}
                  series={recommendedSeries}
                  onSeriesSelect={handleSeriesSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {/* ... (previous preview modal code) ... */}
        {previewModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setPreviewModal(null)}
          >
            <div
              className="bg-gray-800 rounded-2xl max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video rounded-t-2xl overflow-hidden">
                {previewModal.trailerUrl ? (
                  <iframe
                    src={embedYouTubeUrl(previewModal.trailerUrl)}
                    title={previewModal.episodeTitle}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <Image
                    src={previewModal.imageUrl || "/episode-placeholder.png"}
                    alt={previewModal.episodeTitle}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button
                  className="absolute top-4 right-4 bg-gray-900/50 rounded-full p-2 hover:bg-gray-900/70 transition-all"
                  onClick={() => setPreviewModal(null)}
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {previewModal.episodeTitle}
                </h2>
                <p className="text-gray-300">
                  {previewModal.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSeriesEpisodesPage;
