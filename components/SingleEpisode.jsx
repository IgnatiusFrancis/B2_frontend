// "use client";
// import { FaFileDownload } from "react-icons/fa";
// import { usePostData } from "@/hooks/usePostData";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios"; // Import axios

// const SingleEpisode = ({ id }) => {
//   const url = `https://b2xclusive.onrender.com/api/v1/track/episode/${id}`; 
//   const { isLoading, isError, data } = usePostData("single episode", url);

//   const [downloading, setDownloading] = useState(false); // State for tracking download status

//   // Extract episode data
//   const episode = data?.data?.data;
//   const movie = episode?.movie;

//   if (isError)
//     return (
//       <div>
//         <p className="text-red-500 font-bold">Error Fetching Episode</p>
//       </div>
//     );

//   if (isLoading)
//     return (
//       <div className="w-[90%] md:w-5/6 mx-auto my-10">
//         <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//       </div>
//     );

//   if (!episode) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No Episode Found</p>
//       </div>
//     );
//   }

//   const handleDownload = async () => {
//     await fetch(
//       `https://b2xclusive.onrender.com/api/v1/track/download?type=episode&key=${episode.key}&id=${episode.id}`
//     );
//   };

//   return (
//     <div>
//       {/* Poster */}
//       <div className="w-[90%] md:w-5/6 mx-auto my-10">
//         <img
//           src={episode.posterUrl?.url || "/default-placeholder.png"}
//           alt={episode.episodeTitle || "Episode Poster"}
//           className="w-full rounded-lg shadow-lg object-cover"
//         />
//       </div>

//       {/* Episode Details */}
//       <section className="w-[90%] md:w-5/6 mx-auto my-10">
//         <div className="space-y-4">
//           <h1 className="md:text-2xl text-xl font-bold">
//             {episode.episodeTitle || "Untitled Episode"}
//           </h1>
//           <p className="text-gray-600">
//             {episode.description || "No description available."}
//           </p>
//           <p className="text-gray-500 text-sm">
//             Duration: {episode.duration || "Unknown"}
//           </p>
//         </div>

//         {/* Download Section */}
//         <div className="space-y-4 my-10">
//           <p className="md:text-2xl text-xl font-bold">
//             Download link for {movie?.title || "this episode"}
//           </p>
//           <button
//             className={`md:w-[40%] w-full py-5 ${
//               downloading ? "bg-gray-400" : "bg-green-600"
//             } text-white flex justify-center items-center gap-2 rounded-2xl border-none`}
//             onClick={handleDownload}
//             disabled={downloading}
//           >
//             <FaFileDownload /> {downloading ? "Downloading..." : "Download"}
//           </button>
//         </div> 
//       </section>
//     </div>
//   );
// };

// export default SingleEpisode;
