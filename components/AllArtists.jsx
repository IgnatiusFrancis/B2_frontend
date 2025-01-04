"use client";

import { useState } from "react";
import Artist from "./Artist";

import { usePostData } from "@/hooks/usePostData";
function AllArtists() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const url = `https://b2xclusive.onrender.com/api/v1/artist/artists?page=${currentPage}`;
  const { isLoading, isError, data } = usePostData("artistss", url);

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
        <section
          className={` md:w-5/6 p-8 mx-auto  grid grid-cols-2 md:grid-cols-4 gap-4`}
        >
          {currentPosts?.map((data) => (
            <Artist key={data.id} {...data} />
          ))}
        </section>

        <div className="flex justify-center py-8">
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

export default AllArtists;
