// "use client";
// import { useState } from "react";
// import { FaFileDownload } from "react-icons/fa";
// import { Play, Info, Download } from "lucide-react";

// const SingleMovie = ({ movie }) => {
//   const [isDownloading, setIsDownloading] = useState(false);
//   const baseUrl =
//     process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
//     "https://xclusive.onrender.com/api/v1";

//   if (!movie) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center space-y-4 animate-fadeIn">
//           <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
//             <Play className="w-12 h-12 text-gray-400" />
//           </div>
//           <p className="text-gray-400 font-medium">No Movie Found</p>
//         </div>
//       </div>
//     );
//   }

//   const embedYouTubeUrl = (url) => {
//     if (!url) return "";
//     const videoId = url.split("v=")[1]?.split("&")[0];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   const handleDownload = async () => {
//     try {
//       setIsDownloading(true);
//       const data = movie.movie;
//       const downloadUrl = `${baseUrl}/track/download?type=episode&key=${data.episode[0].moviekey}&id=${data.episode[0].id}`;
//       const link = document.createElement("a");
//       link.href = downloadUrl;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Download failed:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const data = movie.movie;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
//       {/* Hero Trailer Section */}
//       <div className="relative w-full lg:w-5/6 mx-auto pt-8 px-4">
//         <div
//           className="relative rounded-2xl overflow-hidden shadow-2xl
//                       transform hover:scale-[1.01] transition-all duration-500"
//         >
//           <div className="aspect-video bg-gray-800/50">
//             <iframe
//               className="w-full h-full"
//               src={embedYouTubeUrl(data.trailerUrl)}
//               title={`${data.title} Trailer`}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//           <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
//           <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-200">
//             {data.title}
//           </h1>
//           <p className="text-gray-300 text-lg">Official Trailer</p>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="w-full lg:w-5/6 mx-auto mt-16 px-4 space-y-8">
//         {/* Synopsis */}
//         <div
//           className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl
//                       transform hover:scale-[1.01] transition-all duration-300"
//         >
//           <div className="flex items-center gap-3 mb-4">
//             <Info className="w-6 h-6 text-purple-400" />
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//               Synopsis
//             </h2>
//           </div>
//           <p className="text-gray-300 text-lg leading-relaxed">
//             {data.description || "No synopsis available."}
//           </p>
//         </div>

//         {/* Download Section */}
//         <div
//           className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl
//                       transform hover:scale-[1.01] transition-all duration-300"
//         >
//           <div className="flex items-center gap-3 mb-6">
//             <Download className="w-6 h-6 text-purple-400" />
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
//               Download {data.title}
//             </h2>
//           </div>

//           <button
//             onClick={handleDownload}
//             disabled={isDownloading}
//             className={`group relative w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-3
//                       transition-all duration-300 ${
//                         isDownloading
//                           ? "bg-purple-600/50 cursor-wait"
//                           : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
//                       }`}
//           >
//             <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
//             <FaFileDownload
//               className={`relative ${
//                 isDownloading
//                   ? "animate-bounce"
//                   : "group-hover:scale-110 transition-transform duration-300"
//               }`}
//             />
//             <span className="relative font-medium">
//               {isDownloading ? "Initiating Download..." : "Download Movie"}
//             </span>
//           </button>

//           <p className="mt-4 text-sm text-gray-400">
//             Click the button above to start downloading. The download will begin
//             automatically.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleMovie;

"use client";
import { useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { Play, Info, Download } from "lucide-react";

const SingleMovie = ({ movie }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  // console.log("env:", process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL);
  if (!movie) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="w-24 h-24 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-400 font-medium">No Movie Found</p>
        </div>
      </div>
    );
  }

  const embedYouTubeUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const data = movie.movie;
  const episode = data.episode?.[0] || null;
  const downloadLinks = episode?.externalDownloadLink || [];

  // Automatically set first link if only one exists
  useState(() => {
    if (downloadLinks.length === 1) {
      setSelectedLink(downloadLinks[0].url);
    }
  }, [downloadLinks]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const data = movie.movie;
      const episode = data.episode[0];
      console.log("episode:", episode);
      // Check if external download link is present

      if (selectedLink && selectedLink.length > 0) {
        window.open(selectedLink, "_blank");
      } else {
        const downloadUrl = `${baseUrl}/track/download?type=episode&key=${episode.moviekey}&id=${episode.id}`;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
      {/* Hero Trailer Section */}
      <div className="relative w-full lg:w-5/6 mx-auto pt-8 px-4">
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl 
                      transform hover:scale-[1.01] transition-all duration-500"
        >
          <div className="aspect-video bg-gray-800/50">
            <iframe
              className="w-full h-full"
              src={embedYouTubeUrl(data.trailerUrl)}
              title={`${data.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-200">
            {data.title}
          </h1>
          <p className="text-gray-300 text-lg">Official Trailer</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="w-full lg:w-5/6 mx-auto mt-16 px-4 space-y-8">
        {/* Synopsis */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl 
                      transform hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Synopsis
            </h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            {data.description || "No synopsis available."}
          </p>
        </div>

        {/* Download Section */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl 
                      transform hover:scale-[1.01] transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Download {data.title}
            </h2>
          </div>

          {downloadLinks.length > 1 && (
            <select
              onChange={(e) => setSelectedLink(e.target.value)}
              value={selectedLink || ""}
              className="group relative w-full md:w-auto px-8 py-4 rounded-xl flex items-center justify-center gap-3 mb-4 
                      transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 bg-gray-700"
            >
              <option value="">Select Quality</option>
              {downloadLinks.map((link, index) => (
                <option key={index} value={link.url}>
                  {link.label || `Option ${index + 1}`}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleDownload}
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
              {isDownloading ? "Initiating Download..." : "Download Movie"}
            </span>
          </button>

          <p className="mt-4 text-sm text-gray-400">
            {downloadLinks.length === 0
              ? ""
              : "Click the button above to download the selected quality."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
