"use client";
import { useEffect, useState } from "react";
import Videos from "./Videos";

function AllVideos({ data: videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No videos Available</p>
      </div>
    );
  }

  const videosPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentVideo, setCurrentVideo] = useState(videos);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    useEffect(() => {
      const indexOfLastVideo = currentPage * videosPerPage;
      const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
      const newVideo = videos.slice(indexOfFirstVideo, indexOfLastVideo);
      setCurrentVideo(newVideo);
    }, [currentPage, videos]);
  
    const totalPages = Math.ceil(videos.length / videosPerPage);


  return (
    <>
      <div>
        <div className="w-full p-4 md:w-full flex flex-col gap-8">
          {currentVideo?.map((video) => (
            <Videos
            key={video.id}
          id={video.id}
          title={video.title}
          thumbnail={video.thumbnail}
          artist={video.artist}
          subtitle={video.subtitle}
          createdAt={video.createdAt}
            />
          ))}
        </div> 

        <div className="flex justify-center py-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
                currentPage === index + 1 ? "bg-gray-100" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AllVideos;
