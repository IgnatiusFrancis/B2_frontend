// "use client";
// import { useEffect, useState } from "react";
// import Videos from "./Videos";

// function AllVideos({ data: videos }) {
//   if (!videos || videos.length === 0) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No videos Available</p>
//       </div>
//     );
//   }

//   const videosPerPage = 8;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [currentVideo, setCurrentVideo] = useState(videos);
  
//     const handlePageChange = (newPage) => {
//       setCurrentPage(newPage);
//     };
  
//     useEffect(() => {
//       const indexOfLastVideo = currentPage * videosPerPage;
//       const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
//       const newVideo = videos.slice(indexOfFirstVideo, indexOfLastVideo);
//       setCurrentVideo(newVideo);
//     }, [currentPage, videos]);
  
//     const totalPages = Math.ceil(videos.length / videosPerPage);


//   return (
//     <>
//       <div>
//         <div className="w-full p-4 md:w-full flex flex-col gap-8">
//           {currentVideo?.map((video) => (
//             <Videos
//             key={video.id}
//           id={video.id}
//           title={video.title}
//           thumbnail={video.thumbnail}
//           artist={video.artist}
//           subtitle={video.subtitle}
//           createdAt={video.createdAt}
//             />
//           ))}
//         </div> 

//         <div className="flex justify-center py-8">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
//                 currentPage === index + 1 ? "bg-gray-100" : ""
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AllVideos;


"use client";
import { useEffect, useState } from "react";
import Videos from "./Videos";
import NoContentAvailable from "./NoAvailableContent";

function AllVideos({ data: videos }) {
  const videosPerPage = 9; // Changed to 9 for 3x3 grid
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVideos, setCurrentVideos] = useState([]);

  useEffect(() => {
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const newVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
    setCurrentVideos(newVideos);
  }, [currentPage, videos]);

  const totalPages = Math.ceil(videos.length / videosPerPage);


  if (!videos || videos.length === 0) {
    return (
      <NoContentAvailable
        title="No videos Found"
        message="It seems there are no videos available at the moment. Please check back later."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            
            <Videos
              key={video.id}
              id={video.id}
              title={video.title}
              url={video.url}
              artist={video.artist}
              subtitle={video.subtitle}
              createdAt={video.createdAt}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12 gap-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md text-sm font-medium
              ${currentPage === index + 1
                ? 'bg-primarycolor text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-primarycolor text-white text-sm font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllVideos;
