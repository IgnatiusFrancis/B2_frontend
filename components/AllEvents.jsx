"use client";
import { useState } from "react";
import EventTicket from "./EventTicket";
import { usePostData } from "@/hooks/usePostData";
function AllEvent() {
  const [currentPage, setCurrentPage] = useState(1);
  const url = `https://b2xclusive.onrender.com/api/v1/event/events?page=${currentPage}`;

  const postsPerPage = 10;

  const { isLoading, isError, data } = usePostData("all-events", url);

  if (isError)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg "></div>

        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg "></div>
        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg "></div>
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
        <div className="flex flex-col gap-4">
          {currentPosts?.map((even) => (
            <EventTicket key={even?.id} {...even} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
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
            className="bg-primarycolor text-white px-4 py-2 md:text-base text-[10px] rounded-md ml-2"
          >
            Next
          </button>{" "}
        </div>
      </div>
    </>
  );
}

export default AllEvent;
