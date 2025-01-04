"use client";

import { useState } from "react";
import ArtistAlbum from "./ArtistAlbum";
import { usePostData } from "@/hooks/usePostData";
function AllMusic() {
  const [currentPage, setCurrentPage] = useState(1);

  const url = `https://b2xclusive.onrender.com/api/v1/track/audios?page=${currentPage}`;
  const postsPerPage = 8;
  const { isLoading, isError, data } = usePostData("all-music", url);

  if (isError)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full md:w-5/6 mx-auto grid grid-cols-4 gap-4 py-4">
        <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg "></div>

        <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-80 w-full bg-gray-300 animate-pulse rounded-lg "></div>
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
    indexOfLastPost
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
        <section className="w-full p-2 md:w-5/6 md:mx-auto md:flex flex-col gap-2">
          {currentPosts?.map((music) => (
            <ArtistAlbum key={music.id} {...music} />
          ))}
        </section>
        <div className="flex justify-center py-8">
          {/* Previous button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border text-[10px] md:text-base border-gray-500 text-gray-500 px-2 md:px-4 md:py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {/* Page number buttons */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`border border-gray-500 text-primarycolor md:text-base text-[10px] px-4 py-2 rounded-md mx-1 ${
                currentPage === number ? "bg-black" : ""
              }`}
            >
              {number}
            </button>
          ))}
          {/* Next button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 md:text-base text-[10px] rounded-md ml-2"
          >
            Next
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default AllMusic;
