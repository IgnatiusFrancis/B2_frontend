"use client";
import { useState } from "react";
import Videos from "./Videos";
import { usePostData } from "@/hooks/usePostData";

function AllVideos() {
  const [currentPage, setCurrentPage] = useState(1);

  const url = `https://b2xclusive.onrender.com/api/v1/track/videos?page=${currentPage}`;
  const postsPerPage = 8;

  const { isLoading, isError, data } = usePostData("videos", url);
  if (isError)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full  mx-auto flex-col flex  gap-4 py-4">
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg "></div>

        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg "></div>
      </div>
    );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.data?.data?.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(data?.data?.data?.length / postsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div>
        <div className="w-full p-4 md:w-full flex flex-col gap-8">
          {currentPosts?.map((video) => (
            <Videos key={video.id} {...video} />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          {/* Previous button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {/* Page number buttons */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`border border-gray-500 text-primarycolor px-4 py-2 rounded-md mx-1 ${
                currentPage === number ? "bg-gray-100" : ""
              }`}
            >
              {number}
            </button>
          ))}
          {/* Next button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default AllVideos;
