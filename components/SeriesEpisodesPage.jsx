// // "use client";
// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import { Play, Clock, Info } from "lucide-react";
// // import { FaFileDownload } from "react-icons/fa";

// // const SeriesEpisodesPage = ({ series }) => {
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [downloadingEpisodes, setDownloadingEpisodes] = useState({});
// //   const [showLinksForEpisode, setShowLinksForEpisode] = useState(null);

// //   const baseUrl =
// //     process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
// //     "https://xclusive.onrender.com/api/v1";

// //   useEffect(() => {
// //     // Set animation timing
// //     setIsLoaded(true);
// //   }, [series]);

// //   if (!series) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="text-center space-y-4 animate-pulse">
// //           <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
// //             <Play className="w-12 h-12 text-gray-400" />
// //           </div>
// //           <p className="text-gray-400 font-medium">Loading series...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const handleDownload = async (episodeId, key, externalDownloadLinks) => {
// //     try {
// //       // Create a copy of current downloading state
// //       const newDownloadingEpisodes = { ...downloadingEpisodes };
// //       newDownloadingEpisodes[episodeId] = true;
// //       setDownloadingEpisodes(newDownloadingEpisodes);

// //       // If there are external download links, show link selection UI
// //       if (externalDownloadLinks && externalDownloadLinks.length > 0) {
// //         setShowLinksForEpisode(episodeId);
// //         return;
// //       }

// //       // Otherwise proceed with regular download
// //       const downloadUrl = `${baseUrl}/track/download?type=episode&key=${key}&id=${episodeId}`;

// //       const link = document.createElement("a");
// //       link.href = downloadUrl;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     } catch (error) {
// //       console.error("Download failed:", error);
// //     } finally {
// //       // Remove downloading state
// //       const finalDownloadingEpisodes = { ...downloadingEpisodes };
// //       delete finalDownloadingEpisodes[episodeId];
// //       setDownloadingEpisodes(finalDownloadingEpisodes);
// //     }
// //   };

// //   const handleExternalLinkDownload = (episodeId, url) => {
// //     try {
// //       window.open(url, "_blank");
// //     } catch (error) {
// //       console.error("External link download failed:", error);
// //     } finally {
// //       setShowLinksForEpisode(null);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
// //       <div className="w-full lg:w-5/6 mx-auto px-4 relative">
// //         <div className="md:flex md:gap-8">
// //           {/* Left Column - Episode Selector with Download */}
// //           <div className="md:w-1/3 lg:w-1/4">
// //             <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-8">
// //               <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
// //                 Episodes
// //               </h2>
// //               <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
// //                 {(series.episodes || []).map((episode, index) => (
// //                   <div
// //                     key={episode.id}
// //                     className="bg-gray-700/30 hover:bg-gray-700/60 rounded-lg p-3 mb-2"
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center">
// //                         <div className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 flex items-center justify-center mr-3">
// //                           {index + 1}
// //                         </div>
// //                         <div>
// //                           <h3 className="font-medium text-sm line-clamp-1 text-gray-200">
// //                             {episode.episodeTitle}
// //                           </h3>
// //                           <div className="flex items-center mt-1">
// //                             <Clock className="w-3 h-3 mr-1 text-gray-400" />
// //                             <span className="text-xs text-gray-400">
// //                               {episode.duration || "N/A"}
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* Download Button */}
// //                       <button
// //                         onClick={() =>
// //                           handleDownload(
// //                             episode.id,
// //                             episode.moviekey,
// //                             episode.externalDownloadLink
// //                           )
// //                         }
// //                         disabled={downloadingEpisodes[episode.id]}
// //                         className={`group relative px-3 py-2 rounded-xl flex items-center justify-center
// //                           transition-all duration-300 ${
// //                             downloadingEpisodes[episode.id]
// //                               ? "bg-purple-600/50 cursor-wait"
// //                               : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
// //                           }`}
// //                       >
// //                         <FaFileDownload
// //                           className={`${
// //                             downloadingEpisodes[episode.id]
// //                               ? "animate-bounce"
// //                               : "group-hover:scale-110 transition-transform duration-300"
// //                           }`}
// //                         />
// //                       </button>
// //                     </div>

// //                     {/* External Links Selection UI */}
// //                     {showLinksForEpisode === episode.id &&
// //                       episode.externalDownloadLink &&
// //                       episode.externalDownloadLink.length > 0 && (
// //                         <div className="mt-3 bg-gray-700/50 p-3 rounded-xl">
// //                           <h4 className="text-sm font-medium mb-2 text-gray-200">
// //                             Select Download Option
// //                           </h4>
// //                           <div className="grid grid-cols-1 gap-2">
// //                             {episode.externalDownloadLink.map((link, index) => (
// //                               <button
// //                                 key={index}
// //                                 onClick={() =>
// //                                   handleExternalLinkDownload(
// //                                     episode.id,
// //                                     link.url
// //                                   )
// //                                 }
// //                                 className="bg-gray-600/50 hover:bg-gray-600 p-2 rounded-lg text-left flex justify-between items-center transition-colors duration-200"
// //                               >
// //                                 <span className="text-sm">
// //                                   {link.label || `Option ${index + 1}`}
// //                                 </span>
// //                                 <FaFileDownload className="text-gray-300" />
// //                               </button>
// //                             ))}
// //                           </div>
// //                           <button
// //                             onClick={() => setShowLinksForEpisode(null)}
// //                             className="mt-2 text-xs text-gray-400 hover:text-white"
// //                           >
// //                             Cancel
// //                           </button>
// //                         </div>
// //                       )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Synopsis Card (Same as before) */}
// //             <div
// //               className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl transform ${
// //                 isLoaded
// //                   ? "translate-y-0 opacity-100"
// //                   : "translate-y-8 opacity-0"
// //               } transition-all duration-700 delay-300 hidden md:block`}
// //             >
// //               <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
// //                 Synopsis
// //               </h2>
// //               <p className="text-gray-300 text-sm leading-relaxed max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
// //                 {series.description ||
// //                   "No description available for this series."}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Right Column - First Episode as Featured Content */}
// //           <div className="md:w-2/3 lg:w-3/4">
// //             {/* Synopsis Card (Mobile Only) - Same as before */}
// //             <div
// //               className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl mb-8 md:hidden transform ${
// //                 isLoaded
// //                   ? "translate-y-0 opacity-100"
// //                   : "translate-y-8 opacity-0"
// //               } transition-all duration-700 delay-300`}
// //             >
// //               <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
// //                 Synopsis
// //               </h2>
// //               <p className="text-gray-300 text-sm leading-relaxed">
// //                 {series.description ||
// //                   "No description available for this series."}
// //               </p>
// //             </div>

// //             {/* Featured First Episode */}
// //             {series.episodes && series.episodes.length > 0 && (
// //               <div
// //                 className={`bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl transform ${
// //                   isLoaded
// //                     ? "translate-y-0 opacity-100 scale-100"
// //                     : "translate-y-8 opacity-0 scale-95"
// //                 } transition-all duration-700 delay-500`}
// //               >
// //                 <div className="relative aspect-video">
// //                   <Image
// //                     src={
// //                       series.episodes[0].imageUrl || "/episode-placeholder.png"
// //                     }
// //                     alt={series.episodes[0].episodeTitle}
// //                     fill
// //                     className="object-cover"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
// //                   <div className="absolute bottom-0 left-0 right-0 p-6">
// //                     <h3 className="text-2xl md:text-3xl font-bold text-gray-100">
// //                       {series.episodes[0].episodeTitle}
// //                     </h3>
// //                   </div>
// //                 </div>

// //                 <div className="p-6">
// //                   <div className="mb-6">
// //                     <h4 className="text-lg font-medium mb-2 text-gray-200">
// //                       About this episode
// //                     </h4>
// //                     <p className="text-gray-300">
// //                       {series.episodes[0].description ||
// //                         "No description available."}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* No Episodes Message */}
// //             {(!series.episodes || series.episodes.length === 0) && (
// //               <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center">
// //                 <div className="w-16 h-16 mx-auto bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
// //                   <Info className="w-8 h-8 text-gray-400" />
// //                 </div>
// //                 <p className="text-gray-400">
// //                   No episodes available for this series yet.
// //                 </p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SeriesEpisodesPage;

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Download, Play, Clock, BookOpen, ChevronRight } from "lucide-react";

// const ModernSeriesEpisodesPage = ({ series }) => {
//   const [featuredEpisode, setFeaturedEpisode] = useState(null);
//   const [downloadingEpisodes, setDownloadingEpisodes] = useState({});
//   const [isLoaded, setIsLoaded] = useState(false);

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

//   if (!series) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-pulse">
//             <Play className="mx-auto w-16 h-16 text-zinc-600" />
//           </div>
//           <p className="text-zinc-500 mt-4">Loading series...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white">
//       <div className="container mx-auto px-4 py-12 lg:py-16">
//         <div className="grid lg:grid-cols-[3fr_2fr] gap-8">
//           {/* Episodes List */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
//                 Episodes
//               </h2>
//               <span className="text-zinc-400">
//                 {series.episodes?.length || 0} Episodes
//               </span>
//             </div>

//             <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
//               {series.episodes?.map((episode, index) => (
//                 <div
//                   key={episode.id}
//                   className="bg-zinc-800/40 hover:bg-zinc-800/60 rounded-2xl p-4 flex items-center justify-between transition-all duration-300 group"
//                   onClick={() => setFeaturedEpisode(episode)}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="bg-zinc-700 text-zinc-300 rounded-full w-10 h-10 flex items-center justify-center font-bold">
//                       {index + 1}
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
//                         {episode.episodeTitle}
//                       </h3>
//                       <div className="flex items-center text-zinc-400 text-sm space-x-2">
//                         <Clock className="w-4 h-4" />
//                         <span>{episode.duration || "N/A"}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDownload(episode);
//                       }}
//                       className={`
//                         rounded-full p-2 transition-all duration-300
//                         ${
//                           downloadingEpisodes[episode.id]
//                             ? "bg-zinc-600 cursor-wait"
//                             : "bg-zinc-700 hover:bg-zinc-600 hover:scale-105"
//                         }
//                       `}
//                     >
//                       {downloadingEpisodes[episode.id] ? (
//                         <div className="animate-spin">
//                           <Download className="w-5 h-5 text-zinc-400" />
//                         </div>
//                       ) : (
//                         <Download className="w-5 h-5 text-zinc-300 hover:text-white" />
//                       )}
//                     </button>
//                     <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Featured Episode Details */}
//           {featuredEpisode && (
//             <div className="bg-zinc-800/40 rounded-3xl overflow-hidden shadow-2xl">
//               <div className="relative aspect-video">
//                 <Image
//                   src={featuredEpisode.imageUrl || "/placeholder.jpg"}
//                   alt={featuredEpisode.episodeTitle}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
//                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                   <h2 className="text-2xl font-bold text-white">
//                     {featuredEpisode.episodeTitle}
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3 flex items-center">
//                     <BookOpen className="w-6 h-6 mr-2 text-zinc-400" />
//                     Episode Description
//                   </h3>
//                   <p className="text-zinc-300">
//                     {featuredEpisode.description || "No description available."}
//                   </p>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => handleDownload(featuredEpisode)}
//                     className={`
//                       flex items-center justify-center space-x-2 px-6 py-3 rounded-xl
//                       bg-gradient-to-r from-zinc-700 to-zinc-600
//                       hover:from-zinc-600 hover:to-zinc-500
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
//                         <Download className="w-5 h-5 text-zinc-400" />
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
//           <div className="mt-12 bg-zinc-800/40 rounded-2xl p-6">
//             <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
//               Series Synopsis
//             </h3>
//             <p className="text-zinc-300 leading-relaxed">
//               {series.description}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModernSeriesEpisodesPage;

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
} from "lucide-react";
import { FaPlay } from "react-icons/fa";

const EnhancedSeriesEpisodesPage = ({ series }) => {
  const [featuredEpisode, setFeaturedEpisode] = useState(null);
  const [downloadingEpisodes, setDownloadingEpisodes] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [previewModal, setPreviewModal] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    // Set first episode as featured by default
    if (series?.episodes?.length > 0) {
      setFeaturedEpisode(series.episodes[0]);
    }
  }, [series]);

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

  const handlePreview = (episode) => {
    setPreviewModal(episode);
  };

  if (!series) {
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
                  onClick={() => setFeaturedEpisode(episode)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-700 text-gray-300 rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {episode.episodeTitle}
                      </h3>
                      <div className="flex items-center text-gray-400 text-sm space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{episode.duration || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(episode);
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
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
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
                    onClick={() => handlePreview(featuredEpisode)}
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
        {series.description && (
          <div className="mt-12 bg-gray-800/40 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Series Synopsis
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {series.description}
            </p>
          </div>
        )}

        {/* Preview Modal */}
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
                <Image
                  src={previewModal.imageUrl || "/episode-placeholder.png"}
                  alt={previewModal.episodeTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button
                  className="absolute top-4 right-4 bg-gray-900/50 rounded-full p-2 hover:bg-gray-900/70 transition-all"
                  onClick={() => setPreviewModal(null)}
                >
                  <Info className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {previewModal.episodeTitle}
                </h2>
                <p className="text-gray-300">
                  {previewModal.description || "No description available."}
                </p>
                <div className="flex items-center mt-4 text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{previewModal.duration || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSeriesEpisodesPage;
