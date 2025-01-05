"use client";

import { useEffect, useState } from "react";
import Artist from "./Artist";

function AllArtists({data:artists}) { 
  if (!artists || artists.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No artists Available</p>
      </div>
    );
  }

    const artistsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentArtists, setCurrentArtists] = useState(artists);
  
    // Handle page change and filter posts based on the current page
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    // Update the current posts based on the selected page
    useEffect(() => {
      const indexOfLastArtist = currentPage * artistsPerPage;
      const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
      const newArtist = artists.slice( indexOfFirstArtist, indexOfLastArtist);
      setCurrentArtists(newArtist); 
    }, [currentPage, artists]);


  const totalPages = Math.ceil(artists.length / artistsPerPage);


  return (
    <>
      <div>
        <section
          className={` md:w-5/6 p-8 mx-auto  grid grid-cols-2 md:grid-cols-4 gap-4`}
        >
          {currentArtists?.map((data) => (
            <Artist 
            key={data.id}
            id={data.id}
            name={data.name}
            image={data.image}
            bio={data.bio}
            />
          ))}
        </section>

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

export default AllArtists;
