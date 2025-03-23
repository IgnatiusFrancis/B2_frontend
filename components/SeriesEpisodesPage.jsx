// import Image from "next/image";
// import Link from "next/link";
// import { Download, ChevronLeft, Play } from "lucide-react";

// const SeriesEpisodesPage = ({ series }) => {
//   if (!series) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center space-y-4 animate-fadeIn">
//           <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
//             <Play className="w-12 h-12 text-gray-400" />
//           </div>
//           <p className="text-gray-400 font-medium">No series Found</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
//       {/* Hero Section */}
//       <div className="relative w-full lg:w-5/6 mx-auto pt-8 px-4">
//         <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
//           <Image
//             src={series.imageUrl || "/placeholder.png"}
//             alt={series.seasonTitle}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
//           <Link
//             href="/series-menu"
//             className="inline-flex items-center text-gray-300 hover:text-purple-400 transition-colors mb-4"
//           >
//             <ChevronLeft className="w-5 h-5 mr-1" />
//             Back to Series
//           </Link>
//           <h1 className="text-4xl md:text-5xl font-bold mb-2">
//             {series.seasonTitle}
//           </h1>
//           <p className="text-gray-300 text-lg">All Episodes</p>
//         </div>
//       </div>

//       {/* Season Description */}
//       <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
//           <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//             Synopsis
//           </h2>
//           <p className="text-gray-300 text-lg leading-relaxed">
//             {series.description || "No description available for this series."}
//           </p>
//         </div>
//       </section>

//       {/* Episodes Section */}
//       <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
//         <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//           Episodes
//         </h2>
//         <div className="space-y-6">
//           {(series.episodes || []).map((episode, index) => (
//             <div
//               key={episode.id}
//               className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl
//                          hover:bg-gray-700/50 transition-all duration-300 animate-fadeIn"
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <div className="md:flex">
//                 {/* Episode Thumbnail */}
//                 <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0">
//                   <Image
//                     src={episode.imageUrl || "/episode-placeholder.png"}
//                     alt={episode.title}
//                     fill
//                     className="object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:bg-gradient-to-t" />
//                   <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-md text-sm">
//                     Episode {episode.episodeNumber || index + 1}
//                   </div>
//                 </div>

//                 {/* Episode Details */}
//                 <div className="p-6 flex flex-col justify-between flex-grow">
//                   <div>
//                     <h3 className="text-xl font-semibold text-white mb-2">
//                       {episode.title}
//                     </h3>
//                     <p className="text-gray-300 line-clamp-2 mb-4">
//                       {episode.description || "No description available."}
//                     </p>
//                     {episode.duration && (
//                       <p className="text-gray-400 text-sm">
//                         Duration: {episode.duration}
//                       </p>
//                     )}
//                   </div>

//                   {/* Download Button */}
//                   <div className="flex justify-end mt-4">
//                     <a
//                       href={episode.downloadUrl}
//                       download={episode.title}
//                       className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white
//                                 py-2 px-4 rounded-lg transition-colors duration-300"
//                     >
//                       <Download className="w-5 h-5 mr-2" />
//                       Download
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* No Episodes Message */}
//       {(!series.episodes || series.episodes.length === 0) && (
//         <div className="w-full lg:w-5/6 mx-auto mt-8 px-4">
//           <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 text-center">
//             <p className="text-gray-400">
//               No episodes available for this series yet.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeriesEpisodesPage;

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

const SeriesEpisodesPage = ({ series }) => {
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
                        <h3 className="font-medium text-sm line-clamp-1">
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
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {currentEpisode.episodeTitle}
                    </h3>
                    <div className="flex items-center mt-2 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-purple-400" />
                      <span>{currentEpisode.duration || "N/A"}</span>
                    </div>
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
                    <a
                      href={
                        currentEpisode.movieUrl ||
                        currentEpisode.externalDownloadLink
                      }
                      download={currentEpisode.episodeTitle}
                      className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white 
                                py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Download Episode
                    </a>
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
