// // app/components/allseries.jsx
// // "use client";

// import Image from "next/image";
// import Link from "next/link";
// import pld from "@/public/pld.jpeg";

// const AllSeriesPage = ({ movie }) => {
//   if (!movie) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <p className="text-gray-500 font-bold text-xl">No Movie Found</p>
//       </div>
//     );
//   }

//   const embedYouTubeUrl = (url) => {
//     if (!url) return "";
//     const videoId = url.split("v=")[1]?.split("&")[0];
//     return `https://www.youtube.com/embed/${videoId}`;
//   };

//   return (
//     <div className="bg-gray-50">
//       {/* Trailer Section */}
//       <div className="w-[90%] md:w-5/6 mx-auto my-10 relative">
//         <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-lg shadow-lg overflow-hidden">
//           <iframe
//             className="w-full h-full"
//             src={embedYouTubeUrl(movie.trailerUrl)}
//             title="Trailer"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//         <p className="text-center mt-4 text-lg text-gray-500">
//           Watch the official trailer of{" "}
//           <span className="font-bold">{movie.title}</span>
//         </p>
//       </div>

//       {/* Synopsis Section */}
//       <section className="w-[90%] md:w-5/6 mx-auto my-10">
//         <div className="space-y-4 bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-3xl font-extrabold text-gray-800">Synopsis</h2>
//           <p className="text-gray-600 text-lg leading-relaxed">
//             {movie.description || "No synopsis available."}
//           </p>
//         </div>
//       </section>

//       {/* Seasons Section */}
//       <section className="w-[90%] md:w-5/6 mx-auto my-10">
//         <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Seasons</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {(movie.seasons || []).map((season) => {
//             const posterUrl = season.imageUrl || pld;

//             return (
//               <Link href={`/season-menu/${season.id}`} key={season.id}>
//                 <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
//                   <Image
//                     src={posterUrl}
//                     alt={season.seasonTitle || "Season Image"}
//                     height={100}
//                     width={100}
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-lg font-bold text-gray-800 truncate">
//                       {season.seasonTitle || "Untitled Season"}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-2">
//                       {season.description || "No description available."}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AllSeriesPage;

// AllSeriesPage.jsx
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

const AllSeriesPage = ({ movie }) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pb-20">
      {/* Hero Trailer Section */}
      <div className="relative w-full lg:w-5/6 mx-auto pt-8 px-4">
        <div
          className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl 
                      transform hover:scale-[1.01] transition-all duration-500"
        >
          <iframe
            className="w-full h-full"
            src={embedYouTubeUrl(movie.trailerUrl)}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-300 text-lg">Watch the official trailer</p>
        </div>
      </div>

      {/* Synopsis Section */}
      <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Synopsis
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {movie.description || "No synopsis available."}
          </p>
        </div>
      </section>

      {/* Seasons Section */}
      <section className="w-full lg:w-5/6 mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Seasons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(movie.seasons || []).map((season, index) => (
            <Link href={`/season-menu/${season.id}`} key={season.id}>
              <div
                className="group relative bg-gray-800/50 rounded-xl overflow-hidden hover:scale-105 
                            transition-all duration-300 backdrop-blur-sm shadow-xl animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative">
                  <Image
                    src={season.imageUrl || "/placeholder.png"}
                    alt={season.seasonTitle}
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
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {season.description || "No description available."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className="font-medium text-gray-200 group-hover:text-purple-400 
                               transition-colors duration-300"
                  >
                    {season.seasonTitle || "Untitled Season"}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
export default AllSeriesPage;
