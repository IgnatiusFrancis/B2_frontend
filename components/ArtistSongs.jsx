// "use client";
// import React, { useState } from "react";
// import ArtistSong from "@/components/ArtistSong";

import ArtistSong from "./ArtistSong";

// const ArtistSongs = ({ tracks, artistId }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;

//   const handleNextPage = () => setCurrentPage((prev) => prev + 1);
//   const handlePrevPage = () => setCurrentPage((prev) => prev - 1);

//   const currentPosts = tracks?.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage
//   );
//   const totalPages = Math.ceil(tracks?.length / postsPerPage);

//   return (
//     <>
//       <div className="flex flex-col gap-2">
//         {currentPosts.map((audio) => (
//           <ArtistSong key={audio.id} {...audio} />
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//           className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
//         >
//           Previous
//         </button>
//         {[...Array(totalPages).keys()].map((number) => (
//           <button
//             key={number}
//             onClick={() => setCurrentPage(number + 1)}
//             className={`border border-gray-500 text-primarycolor px-4 py-2 rounded-md mx-1 ${
//               currentPage === number + 1 ? "bg-white" : ""
//             }`}
//           >
//             {number + 1}
//           </button>
//         ))}
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default ArtistSongs;



// components/ArtistSongs.js
export default function ArtistSongs({ tracks }) {
  return (
    <div className="flex flex-col gap-2">
      {tracks?.map((track) => (
        <ArtistSong key={track.id} {...track} />
      ))}
    </div>
  );
}